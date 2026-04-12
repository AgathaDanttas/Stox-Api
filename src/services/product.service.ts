import { prisma } from "../lib/prisma";

export async function createProductService(data: any, userName: string) {
  const product = await prisma.product.create({
    data: {
      name: data.name,
      barcode: data.barcode,
      brand: data.brand,
      description: data.description,

      quantity: Number(data.quantity) || 0,
      purchasePrice: Number(data.purchasePrice) || 0,
      salePrice: Number(data.salePrice) || 0,
      
      minStock: Number(data.minStock) || 0,
      maxStock: Number(data.maxStock) || 0,
      location: data.location,

      categoryId: data.categoryId || null,
      supplierId: data.supplierId || null,
      companyId: data.companyId,

      customFields: data.customFields || []
    },
  });

  // Record product creation log
  await prisma.auditLog.create({
    data: {
      action: "CREATE",
      entity: "PRODUCT",
      entityId: product.id,
      description: `Criação do produto: ${product.name}`,
      reason: "Cadastro",
      userName: userName, 
      companyId: data.companyId
    }
  });

  const quantity = Number(data.quantity) || 0;
  if (quantity > 0) {
    const batch = await prisma.batch.create({
      data: {
        batchNumber: "L-" + Date.now().toString().slice(-6),
        quantity: quantity,
        productId: product.id,
        companyId: data.companyId
      }
    });
  }

  return product;
}

export async function getProductsService(companyId: string) {
  const products = await prisma.product.findMany({
    where: { companyId },
    include: {
      category: true,
      supplier: true,
      batches: {
        orderBy: {
          expiresAt: 'asc'
        }
      }
    },
    orderBy: { createdAt: "desc" },
  });
  return products;
}

export async function updateProductService(id: string, data: any, userName: string) {
  const product = await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      barcode: data.barcode,
      brand: data.brand,
      description: data.description,
      
      quantity: data.quantity !== undefined ? Number(data.quantity) : undefined,
      purchasePrice: data.purchasePrice !== undefined ? Number(data.purchasePrice) : undefined,
      salePrice: data.salePrice !== undefined ? Number(data.salePrice) : undefined,
      
      minStock: data.minStock !== undefined ? Number(data.minStock) : undefined,
      maxStock: data.maxStock !== undefined ? Number(data.maxStock) : undefined,
      location: data.location,

      categoryId: data.categoryId,
      supplierId: data.supplierId,

      customFields: data.customFields
    },
  });

  await prisma.auditLog.create({
    data: {
      action: "UPDATE",
      entity: "PRODUCT",
      entityId: product.id,
      description: `Atualização do produto: ${product.name}`,
      reason: "Edição de cadastro via Dashboard",
      userName: userName,
      companyId: product.companyId
    }
  });

  return product;
}
export async function deleteProductService(id: string, userName: string) {
  const product = await prisma.product.findUnique({ where: { id }});
  if (!product) return { success: false };

  await prisma.batch.deleteMany({ where: { productId: id }});
  await prisma.product.delete({
    where: { id },
  });

  await prisma.auditLog.create({
    data: {
      action: "DELETE",
      entity: "PRODUCT",
      entityId: id,
      description: `Exclusão do produto: ${product.name}`,
      reason: "Não informado", // Optionally handled from client side
      userName: userName,
      companyId: product.companyId
    }
  });

  return { success: true };
}

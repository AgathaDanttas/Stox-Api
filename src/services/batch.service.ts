import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export class BatchService {
  async createBatch(productId: string, companyId: string, data: any, userName: string) {
    // 1. Create the batch
    const batch = await prisma.batch.create({
      data: {
        batchNumber: data.batchNumber,
        quantity: data.quantity,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
        productId,
        companyId,
      },
    });

    // 2. Increment the product quantity
    await prisma.product.update({
      where: { id: productId },
      data: {
        quantity: { increment: data.quantity }
      }
    });

    // 3. Register movement
    await prisma.auditLog.create({
      data: {
        action: "UPDATE",
        entity: "PRODUCT",
        entityId: productId,
        description: `Entrada de estoque via novo lote (${batch.batchNumber})`,
        reason: "Reposição/Entrada",
        userName: userName,
        companyId
      }
    });

    return batch;
  }

  async getBatchesByProduct(productId: string, companyId: string) {
    return prisma.batch.findMany({
      where: { productId, companyId },
      orderBy: { expiresAt: 'asc' }
    });
  }

  async deleteBatch(id: string, companyId: string, userName: string) {
    const batch = await prisma.batch.findUnique({ where: { id, companyId } });
    if (!batch) throw new Error("Lote não encontrado.");

    // Decrement from product
    await prisma.product.update({
      where: { id: batch.productId },
      data: {
        quantity: { decrement: batch.quantity }
      }
    });

    // Register movement OUT
    await prisma.auditLog.create({
      data: {
        action: "UPDATE",
        entity: "PRODUCT",
        entityId: batch.productId,
        description: `Saída de estoque via remoção de lote (${batch.batchNumber})`,
        reason: "Exclusão manual de lote",
        userName: userName,
        companyId
      }
    });

    return prisma.batch.delete({ where: { id } });
  }
}

export const batchService = new BatchService();

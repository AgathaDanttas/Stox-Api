import { prisma } from "../lib/prisma";

export async function createSupplierService(data: { name: string, email: string, phone: string, companyId: string }, userName: string) {
  const supplier = await prisma.supplier.create({ data });

  // Record supplier creation log
  await prisma.auditLog.create({
    data: {
      action: "CREATE",
      entity: "SUPPLIER",
      entityId: supplier.id,
      description: `Cadastro de fornecedor: ${supplier.name}`,
      reason: "Cadastro",
      userName: userName,
      companyId: data.companyId,
    }
  });

  return supplier;
}

export async function getSuppliersService(companyId: string) {
  const suppliers = await prisma.supplier.findMany({
    where: { companyId },
    orderBy: { name: "asc" },
  });
  return suppliers;
}

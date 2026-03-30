import { prisma } from "../lib/prisma";

export async function createSupplierService(data: { name: string, email: string, phone: string, companyId: string }) {
  const supplier = await prisma.supplier.create({ data });
  return supplier;
}

export async function getSuppliersService(companyId: string) {
  const suppliers = await prisma.supplier.findMany({
    where: { companyId },
    orderBy: { name: "asc" },
  });
  return suppliers;
}

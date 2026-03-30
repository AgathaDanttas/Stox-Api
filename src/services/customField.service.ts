import { prisma } from "../lib/prisma";

export async function createCustomFieldService(data: { name: string, type: string, isGlobal?: boolean, companyId: string }) {
  const customField = await prisma.customField.create({ 
    data: {
      name: data.name,
      type: data.type,
      isGlobal: data.isGlobal || false,
      companyId: data.companyId
    } 
  });
  return customField;
}

export async function getCustomFieldsService(companyId: string) {
  const fields = await prisma.customField.findMany({
    where: { companyId },
    orderBy: { createdAt: "asc" },
  });
  return fields;
}

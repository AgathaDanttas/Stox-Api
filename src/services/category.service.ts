import { prisma } from "../lib/prisma";

export async function createCategoryService(data: { name: string, color: string, companyId: string }, userName: string) {
  const category = await prisma.category.create({ data });

  // Record category creation log
  await prisma.auditLog.create({
    data: {
      action: "CREATE",
      entity: "CATEGORY",
      entityId: category.id,
      description: `Cadastro de categoria: ${category.name}`,
      reason: "Cadastro",
      userName: userName,
      companyId: data.companyId,
    }
  });

  return category;
}

export async function getCategoriesService(companyId: string) {
  const categories = await prisma.category.findMany({
    where: { companyId },
    orderBy: { name: "asc" },
  });
  return categories;
}

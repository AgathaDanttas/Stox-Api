import { prisma } from "../lib/prisma";

export async function createCategoryService(data: { name: string, color: string, companyId: string }) {
  const category = await prisma.category.create({ data });
  return category;
}

export async function getCategoriesService(companyId: string) {
  const categories = await prisma.category.findMany({
    where: { companyId },
    orderBy: { name: "asc" },
  });
  return categories;
}

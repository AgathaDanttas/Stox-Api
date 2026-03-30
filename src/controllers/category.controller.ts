import { Request, Response } from "express";
import { createCategoryService, getCategoriesService } from "../services/category.service";

export async function createCategory(req: Request, res: Response) {
  try {
    const data = req.body;
    if (!data.name || !data.companyId || !data.color) {
      return res.status(400).json({ error: "Nome, cor e companyId são obrigatórios." });
    }
    const category = await createCategoryService(data);
    return res.status(201).json(category);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Erro ao criar categoria" });
  }
}

export async function getCategories(req: Request, res: Response) {
  try {
    const { companyId } = req.query;
    if (!companyId) return res.status(400).json({ error: "companyId é obrigatório." });
    const categories = await getCategoriesService(companyId as string);
    return res.status(200).json(categories);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Erro ao buscar categorias" });
  }
}

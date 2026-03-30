import { Request, Response } from "express";
import { 
  createProductService, 
  getProductsService, 
  updateProductService, 
  deleteProductService 
} from "../services/product.service";

export async function createProduct(req: Request, res: Response) {
  try {
    const data = req.body;
    if (!data.name || !data.companyId) {
      return res.status(400).json({ error: "Nome e companyId são obrigatórios." });
    }
    const product = await createProductService(data);
    return res.status(201).json(product);
  } catch (error: any) {
    console.error("Erro no createProduct:", error);
    return res.status(400).json({ error: error.message || "Erro ao criar produto" });
  }
}

export async function getProducts(req: Request, res: Response) {
  try {
    const { companyId } = req.query;
    if (!companyId) {
      return res.status(400).json({ error: "companyId é obrigatório." });
    }
    const products = await getProductsService(companyId as string);
    return res.status(200).json(products);
  } catch (error: any) {
    console.error("Erro no getProducts:", error);
    return res.status(400).json({ error: error.message || "Erro ao buscar produtos" });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    const product = await updateProductService(id as string, data);
    return res.status(200).json(product);
  } catch (error: any) {
    console.error("Erro no updateProduct:", error);
    return res.status(400).json({ error: error.message || "Erro ao atualizar produto" });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await deleteProductService(id as string);
    return res.status(200).json({ message: "Produto excluído com sucesso" });
  } catch (error: any) {
    console.error("Erro no deleteProduct:", error);
    return res.status(400).json({ error: error.message || "Erro ao excluir produto" });
  }
}

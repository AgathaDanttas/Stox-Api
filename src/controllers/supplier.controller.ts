import { Request, Response } from "express";
import { createSupplierService, getSuppliersService } from "../services/supplier.service";

export async function createSupplier(req: Request, res: Response) {
  try {
    const data = req.body;
    if (!data.name || !data.email || !data.companyId) {
      return res.status(400).json({ error: "Nome, email e companyId são obrigatórios." });
    }
    const userName = (req.headers["x-user-name"] as string) || "Sistema";
    const supplier = await createSupplierService(data, userName);
    return res.status(201).json(supplier);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Erro ao criar fornecedor" });
  }
}

export async function getSuppliers(req: Request, res: Response) {
  try {
    const { companyId } = req.query;
    if (!companyId) return res.status(400).json({ error: "companyId é obrigatório." });
    const suppliers = await getSuppliersService(companyId as string);
    return res.status(200).json(suppliers);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Erro ao buscar fornecedores" });
  }
}

import { Request, Response } from "express";
import { createCustomFieldService, getCustomFieldsService } from "../services/customField.service";

export async function createCustomField(req: Request, res: Response) {
  try {
    const data = req.body;
    if (!data.name || !data.type || !data.companyId) {
      return res.status(400).json({ error: "Nome, tipo e companyId são obrigatórios." });
    }
    const customField = await createCustomFieldService(data);
    return res.status(201).json(customField);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Erro ao criar campo personalizado" });
  }
}

export async function getCustomFields(req: Request, res: Response) {
  try {
    const { companyId } = req.query;
    if (!companyId) return res.status(400).json({ error: "companyId é obrigatório." });
    const fields = await getCustomFieldsService(companyId as string);
    return res.status(200).json(fields);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || "Erro ao buscar campos personalizados" });
  }
}

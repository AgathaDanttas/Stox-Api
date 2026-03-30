import { Request, Response } from "express";
import { registerCompanyService } from "../services/company.service";

export async function registerCompany(req: Request, res: Response) {
  try {
    const { company, representative, user } = req.body;

    if (!company || !representative || !user) {
      return res.status(400).json({
        error: "Dados de empresa, representante e usuário são obrigatórios.",
      });
    }

    const result = await registerCompanyService({
      company,
      representative,
      user,
    });

    return res.status(201).json(result);
  } catch (error: any) {
    console.error("Erro no registerCompany:", error);

    return res.status(400).json({
      error: error.message || "Erro ao cadastrar empresa",
    });
  }
}
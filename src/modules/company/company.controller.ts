import { Request, Response } from "express";
import { registerCompanyService } from "./company.service";

export async function registerCompany(req: Request, res: Response) {
    try {
        const data = req.body;

        const company = await registerCompanyService(data);

        return res.status(201).json({ message: `Empresa cadastrada com sucesso: ${company}` });
    } catch (error) {
        return res.status(400).json({ message: error ?? "Erro ao cadastrar empresa" });
    }
};
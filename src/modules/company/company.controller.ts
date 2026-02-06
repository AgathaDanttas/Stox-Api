import { Request,Response } from "express";
import { registerComapanyService } from "./company.service";

export async function registerComapny(req:Request, res:Response){
    try {
        const data = req.body;  

        await registerComapanyService(data);

        return res.status(201).json({message: "Empresa cadastrada com sucesso"});
    } catch (error) {
        return res.status(400).json({error:"Erro ao cadastrar empresa"});
    }
};
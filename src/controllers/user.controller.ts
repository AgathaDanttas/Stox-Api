import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import { sendWelcomeEmail } from "../services/email.service";

const prisma = new PrismaClient();

function generateMatricula(index: number): string {
  const year = new Date().getFullYear();
  const num = String(index).padStart(4, "0");
  return `STX-${year}-${num}`;
}

export async function listUsers(req: Request, res: Response): Promise<any> {
  try {
    const { companyId } = req.query;
    if (!companyId) return res.status(400).json({ error: "companyId é obrigatório." });

    const users = await prisma.user.findMany({
      where: { companyId: String(companyId) },
      select: { id: true, name: true, email: true, matricula: true, profile: true, createdAt: true },
      orderBy: { createdAt: "asc" }
    });

    return res.json(users);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao listar colaboradores." });
  }
}

export async function createUser(req: Request, res: Response): Promise<any> {
  try {
    const { name, email, password, profile, companyId } = req.body;
    if (!name || !email || !password || !profile || !companyId) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: "E-mail já cadastrado." });

    const company = await prisma.company.findUnique({ where: { id: String(companyId) } });
    if (!company) return res.status(404).json({ error: "Empresa não encontrada." });

    // Gerar matrícula sequencial
    const count = await prisma.user.count({ where: { companyId } });
    const matricula = generateMatricula(count + 1);

    const user = await prisma.user.create({
      data: { name, email, password, profile, companyId, matricula }
    });

    // Enviar e-mail com matrícula (não bloqueia a resposta em caso de falha)
    sendWelcomeEmail({
      to: email, name, matricula, password,
      companyName: company.nameFantasy || company.nameReason
    }).catch((err) => console.error("❌ Falha no envio de e-mail:", err));

    return res.status(201).json({
      id: user.id, name: user.name, email: user.email,
      matricula: user.matricula, profile: user.profile, createdAt: user.createdAt
    });
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ error: "Erro ao criar colaborador." });
  }
}

export async function updateUser(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;
    const { name, profile } = req.body;

    const user = await prisma.user.update({
      where: { id },
      data: { name, profile }
    });

    return res.json({ id: user.id, name: user.name, profile: user.profile, matricula: user.matricula });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar colaborador." });
  }
}

export async function deleteUser(req: Request, res: Response): Promise<any> {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Erro ao remover colaborador." });
  }
}

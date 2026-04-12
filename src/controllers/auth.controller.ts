import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export async function loginCompany(req: Request, res: Response): Promise<any> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email (Matrícula) e senha são obrigatórios." });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { matricula: email } // In case the user typed their matricula in the email field
        ]
      },
      include: { company: true }
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Senha inválida." });
    }

    // Em um cenário real, um token JWT deve ser emitido.
    return res.status(200).json({
      message: "Login realizado com sucesso!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile,
        company: user.company
      }
    });

  } catch (error: any) {
    console.error("Erro no loginCompany:", error);
    return res.status(500).json({ error: "Erro interno do servidor ao realizar login." });
  }
}

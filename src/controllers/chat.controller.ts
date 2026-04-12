import { Request, Response } from "express";
import { PrismaClient, UserRole } from "../generated/prisma";

const prisma = new PrismaClient();

export class ChatController {
  async getMessages(req: Request, res: Response) {
    try {
      const companyId = req.params.companyId as string;
      const receiverId = req.query.receiverId as string;
      const userId = req.query.userId as string;
      
      let whereClause: any = { companyId };
      
      if (receiverId && receiverId !== "global") {
         if (!userId) {
           return res.status(400).json({ error: "Missing userId for direct messages" });
         }
         whereClause = {
           companyId,
           OR: [
             { userId: userId, receiverId: receiverId },
             { userId: receiverId, receiverId: userId }
           ]
         };
      } else {
         whereClause = {
           companyId,
           receiverId: null
         };
      }
      
      const messages = await prisma.message.findMany({
        where: whereClause,
        include: { user: { select: { name: true, email: true } } },
        orderBy: { createdAt: "asc" }
      });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar mensagens" });
    }
  }

  async getCompanyUsers(req: Request, res: Response) {
    try {
      const companyId = req.params.companyId as string;
      const users = await prisma.user.findMany({
        where: { companyId },
        select: { id: true, name: true, email: true, profile: true }
      });
      res.json(users);
    } catch (error) {
       res.status(500).json({ error: "Erro ao buscar usários da equipe" });
    }
  }

  // Helper method to ensure a mock user exists for our development environment 
  async ensureMockUser(req: Request, res: Response) {
    try {
      const companyId = req.params.companyId as string;
      
      let user = await prisma.user.findFirst({
        where: { companyId, name: "Usuário Mockado" }
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            name: "Usuário Mockado",
            email: "mocked@user.com",
            password: "hashedpassword",
            profile: UserRole.ADMIN,
            companyId
          }
        });
      }

      res.json(user);
    } catch (error) {
       res.status(500).json({ error: "Erro ao criar/buscar usuário mockado" });
    }
  }
}

export const chatController = new ChatController();

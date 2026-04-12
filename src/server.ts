import http from "http";
import { Server } from "socket.io";
import { app } from "./app";
import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // allow all logic due to development
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`🔌 Novo cliente de chat conectado: ${socket.id}`);

  socket.on("join_company", (companyId: string, userId?: string) => {
    socket.join(companyId);
    if (userId) {
      socket.join(userId);
    }
  });

  socket.on("send_message", async (data: { companyId: string; userId: string; text: string; receiverId?: string }) => {
    try {
      const message = await prisma.message.create({
        data: {
          text: data.text,
          userId: data.userId,
          companyId: data.companyId,
          receiverId: data.receiverId && data.receiverId !== "global" ? data.receiverId : null
        },
        include: {
          user: {
            select: { name: true }
          }
        }
      });
      
      if (data.receiverId && data.receiverId !== "global") {
         io.to(data.userId).to(data.receiverId).emit("receive_message", message);
      } else {
         io.to(data.companyId).emit("receive_message", message);
      }
    } catch (error) {
      console.error("Erro socket - send_message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`🔴 Cliente desconectado: ${socket.id}`);
  });
});

const PORT = 3333;

server.listen(PORT, () => {
    console.log(`🚀 Stox API rodando na porta ${PORT} com Sockets ativados`);
    setInterval(() => console.log('keep alive'), 300000);
});
import { Router } from "express";
import { chatController } from "../controllers/chat.controller";

export const chatRoutes = Router();

chatRoutes.get("/messages/users/:companyId", chatController.getCompanyUsers);
chatRoutes.get("/messages/:companyId", chatController.getMessages);
chatRoutes.post("/messages/mock-user/:companyId", chatController.ensureMockUser);

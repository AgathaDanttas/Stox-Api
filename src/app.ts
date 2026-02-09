import express from "express";
import cors from "cors"
import { companyRoutes } from "./modules/company/company.routes";

export const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use(companyRoutes);

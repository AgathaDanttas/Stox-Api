import express from "express";
import { companyRoutes } from "./routes";
import cors from "cors";

export const app = express();

app.use(cors({
  origin: "http://localhost:5174",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/companies",companyRoutes)


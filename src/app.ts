import express from "express";
import { companyRoutes, productRoutes, supplierRoutes, categoryRoutes, customFieldRoutes, batchRoutes, auditLogRoutes, chatRoutes, userRoutes, statsRoutes } from "./routes";
import cors from "cors";
import { loginCompany } from "./controllers/auth.controller";
import "dotenv/config";

export const app = express();

app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/companies", companyRoutes);
app.use("/products", productRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/categories", categoryRoutes);
app.use("/custom-fields", customFieldRoutes);
app.use("/api", batchRoutes);
app.use("/api", auditLogRoutes);
app.use("/api", chatRoutes);
app.use("/users", userRoutes);
app.use("/stats", statsRoutes);
app.post("/auth/login", loginCompany);

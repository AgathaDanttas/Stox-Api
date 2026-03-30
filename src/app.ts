import express from "express";
import { companyRoutes, productRoutes, supplierRoutes, categoryRoutes, customFieldRoutes, batchRoutes } from "./routes";
import cors from "cors";

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

import { Router } from "express";
import { createSupplier, getSuppliers } from "../controllers/supplier.controller";

const supplierRoutes = Router();

supplierRoutes.post("/", createSupplier);
supplierRoutes.get("/", getSuppliers);

export default supplierRoutes;

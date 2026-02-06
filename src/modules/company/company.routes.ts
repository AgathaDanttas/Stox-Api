import { Router } from "express";
import { registerComapny } from "./company.controller";

export const companyRoutes = Router();

companyRoutes.post("/register",registerComapny);
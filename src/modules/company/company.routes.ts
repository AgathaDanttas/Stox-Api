import { Router } from "express";
import { registerCompany } from "./company.controller";

export const companyRoutes = Router();

companyRoutes.options("/companies", (req, res) => {
  res.sendStatus(200);
});
companyRoutes.post("/companies",registerCompany);
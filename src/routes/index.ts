import { Router } from "express";
import {companyRoutes} from "../modules/company/company.routes"

export const routes = Router();
routes.use("/companies",companyRoutes)
import { Router } from "express";
import { createCategory, getCategories } from "../controllers/category.controller";

const categoryRoutes = Router();

categoryRoutes.post("/", createCategory);
categoryRoutes.get("/", getCategories);

export default categoryRoutes;

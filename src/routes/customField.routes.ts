import { Router } from "express";
import { createCustomField, getCustomFields } from "../controllers/customField.controller";

const customFieldRoutes = Router();

customFieldRoutes.post("/", createCustomField);
customFieldRoutes.get("/", getCustomFields);

export default customFieldRoutes;

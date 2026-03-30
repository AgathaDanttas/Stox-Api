import { Router } from "express";
import { registerCompany } from "../controllers/company.controller";
import { loginCompany } from "../controllers/auth.controller";


const router = Router();

router.post("/register", registerCompany);
router.post("/login", loginCompany);

export default router;

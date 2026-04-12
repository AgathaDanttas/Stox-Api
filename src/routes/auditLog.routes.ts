import { Router } from "express";
import { auditLogController } from "../controllers/auditLog.controller";

const router = Router();

router.post("/audit-logs", auditLogController.log);
router.get("/audit-logs", auditLogController.getLogs);

export { router as auditLogRoutes };

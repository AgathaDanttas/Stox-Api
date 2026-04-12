import { Request, Response } from "express";
import { auditLogService } from "../services/auditLog.service";
import { ActionType, EntityType } from "../generated/prisma";

export class AuditLogController {
  async log(req: Request, res: Response): Promise<void> {
    try {
      const { action, entity, entityId, description, reason, userName, userEmail, companyId } = req.body;
      const logEntry = await auditLogService.log({
        action: action as ActionType,
        entity: entity as EntityType,
        entityId,
        description,
        reason,
        userName,
        userEmail,
        companyId
      });
      res.status(201).json(logEntry);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getLogs(req: Request, res: Response): Promise<void> {
    try {
      const companyId = String(req.query.companyId);
      const filters = {
        action: req.query.action ? String(req.query.action) : undefined,
        entity: req.query.entity ? String(req.query.entity) : undefined,
        userName: req.query.userName ? String(req.query.userName) : undefined,
        startDate: req.query.startDate ? String(req.query.startDate) : undefined,
        endDate: req.query.endDate ? String(req.query.endDate) : undefined
      };
      
      const logs = await auditLogService.getLogs(companyId, filters);
      res.json(logs);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const auditLogController = new AuditLogController();

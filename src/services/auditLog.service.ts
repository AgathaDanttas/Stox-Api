import { PrismaClient, ActionType, EntityType } from "../generated/prisma";

const prisma = new PrismaClient();

export class AuditLogService {
  async log(data: {
    action: ActionType;
    entity: EntityType;
    entityId: string;
    description: string;
    reason?: string;
    userName: string;
    userEmail?: string;
    companyId: string;
  }) {
    return prisma.auditLog.create({
      data: {
         action: data.action,
         entity: data.entity,
         entityId: data.entityId,
         description: data.description,
         reason: data.reason,
         userName: data.userName,
         userEmail: data.userEmail,
         companyId: data.companyId
      }
    });
  }

  async getLogs(companyId: string, filters: any = {}) {
    const where: any = { companyId };
    if (filters.action) where.action = filters.action;
    if (filters.entity) where.entity = filters.entity;
    if (filters.userName) where.userName = { contains: filters.userName, mode: 'insensitive' };
    
    if (filters.startDate || filters.endDate) {
      where.createdAt = {};
      
      if (filters.startDate) {
        const start = new Date(filters.startDate);
        start.setHours(0, 0, 0, 0);
        where.createdAt.gte = start;
      }
      if (filters.endDate) {
        const end = new Date(filters.endDate);
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    return prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 200
    });
  }
}

export const auditLogService = new AuditLogService();

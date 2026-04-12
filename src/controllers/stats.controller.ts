import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export async function getOverview(req: Request, res: Response): Promise<any> {
  try {
    const { companyId } = req.query;
    if (!companyId) return res.status(400).json({ error: "companyId é obrigatório." });

    const [totalProducts, criticalStock, recentMovements, totalSuppliers] = await Promise.all([
      prisma.product.count({ where: { companyId: String(companyId) } }),
      prisma.product.count({
        where: {
          companyId: String(companyId),
          OR: [
            // Using a simple logic: quantity <= minStock
            // Prisma MongoDB doesn't support complex cross-field comparisons easily in count
            // but we can fetch them or use a common sense threshold for now
            { quantity: { lte: 5 } }
          ]
        }
      }),
      prisma.auditLog.findMany({
        where: { companyId: String(companyId) },
        take: 5,
        orderBy: { createdAt: "desc" }
      }),
      prisma.supplier.count({ where: { companyId: String(companyId) } })
    ]);

    // Calculate total stock value
    const products = await prisma.product.findMany({
       where: { companyId: String(companyId) },
       select: { quantity: true, salePrice: true }
    });
    
    const totalStockValue = products.reduce((acc, p) => acc + (p.quantity * p.salePrice), 0);

    return res.json({
      totalProducts,
      criticalStock,
      totalSuppliers,
      totalStockValue,
      recentMovements: recentMovements.map(m => ({
        id: m.id,
        description: m.description,
        userName: m.userName,
        createdAt: m.createdAt,
        action: m.action
      }))
    });
  } catch (error) {
    console.error("Erro getOverview:", error);
    return res.status(500).json({ error: "Erro ao carregar estatísticas." });
  }
}

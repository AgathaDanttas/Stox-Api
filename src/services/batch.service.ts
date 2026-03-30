import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export class BatchService {
  async createBatch(productId: string, companyId: string, data: any) {
    // 1. Create the batch
    const batch = await prisma.batch.create({
      data: {
        batchNumber: data.batchNumber,
        quantity: data.quantity,
        expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
        productId,
        companyId,
      },
    });

    // 2. Increment the product quantity
    await prisma.product.update({
      where: { id: productId },
      data: {
        quantity: { increment: data.quantity }
      }
    });

    return batch;
  }

  async getBatchesByProduct(productId: string, companyId: string) {
    return prisma.batch.findMany({
      where: { productId, companyId },
      orderBy: { expiresAt: 'asc' }
    });
  }

  async deleteBatch(id: string, companyId: string) {
    const batch = await prisma.batch.findUnique({ where: { id, companyId } });
    if (!batch) throw new Error("Lote não encontrado.");

    // Decrement from product
    await prisma.product.update({
      where: { id: batch.productId },
      data: {
        quantity: { decrement: batch.quantity }
      }
    });

    return prisma.batch.delete({ where: { id } });
  }
}

export const batchService = new BatchService();

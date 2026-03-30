import { Request, Response } from "express";
import { batchService } from "../services/batch.service";

export class BatchController {
  async createBatch(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const { companyId, ...data } = req.body;
      const batch = await batchService.createBatch(productId, String(companyId), data);
      res.status(201).json(batch);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getBatchesByProduct(req: Request, res: Response): Promise<void> {
    try {
      const { productId } = req.params;
      const companyId = req.query.companyId as string;
      const batches = await batchService.getBatchesByProduct(productId, String(companyId));
      res.json(batches);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteBatch(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const companyId = req.query.companyId || req.body.companyId;
      await batchService.deleteBatch(id, String(companyId));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const batchController = new BatchController();

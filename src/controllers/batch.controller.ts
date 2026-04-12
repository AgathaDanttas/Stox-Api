import { Request, Response } from "express";
import { batchService } from "../services/batch.service";

export class BatchController {
  async createBatch(req: Request, res: Response): Promise<void> {
    try {
      const productId = String(req.params.productId);
      const companyId = String(req.body.companyId);
      const { companyId: _, ...data } = req.body;
      const userName = (req.headers["x-user-name"] as string) || "Sistema";
      const batch = await batchService.createBatch(productId, companyId, data, userName);
      res.status(201).json(batch);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getBatchesByProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId = String(req.params.productId);
      const companyId = String(req.query.companyId);
      const batches = await batchService.getBatchesByProduct(productId, companyId);
      res.json(batches);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteBatch(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      const companyId = String(req.query.companyId || req.body.companyId);
      const userName = (req.headers["x-user-name"] as string) || "Sistema";
      await batchService.deleteBatch(id, companyId, userName);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export const batchController = new BatchController();

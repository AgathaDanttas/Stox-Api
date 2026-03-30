import { Router } from "express";
import { batchController } from "../controllers/batch.controller";

const router = Router();

// As rotas de batches são geralmente dependentes do Produto
router.post("/products/:productId/batches", batchController.createBatch);
router.get("/products/:productId/batches", batchController.getBatchesByProduct);
router.delete("/batches/:id", batchController.deleteBatch);

export { router as batchRoutes };

import { Router } from "express";
import { 
  createProduct, 
  getProducts, 
  updateProduct, 
  deleteProduct 
} from "../controllers/product.controller";

const productRoutes = Router();

productRoutes.post("/", createProduct);
productRoutes.get("/", getProducts);
productRoutes.put("/:id", updateProduct);
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;

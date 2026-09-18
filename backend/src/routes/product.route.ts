import { Router } from "express";

import {
    createProductController,
    deleteProductController,
    getProductByIdController,
    getProductsController,
    updateProductController,
} from "../controllers/product.controller.js";
import { createProductSchema, updateProductSchema } from "../schemas/product.schema.js";
import { validate } from "../middleware/validate.middleware.js";
import { authenticateJWT } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

router.post(
    "/",
    authenticateJWT,
    authorize("ADMIN"),
    validate(createProductSchema),
    createProductController
);

router.get(
    "/",
    getProductsController
);

router.get(
    "/:id",
    getProductByIdController
);

router.patch(
    "/:id",
    authenticateJWT,
    authorize("ADMIN"),
    validate(updateProductSchema),
    updateProductController
);

router.delete(
    "/:id",
    authenticateJWT,
    authorize("ADMIN"),
    deleteProductController
);

export default router;
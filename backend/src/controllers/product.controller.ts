import type { Request, Response } from "express";

import {
    createProducts,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from "../services/product.service.js";

export const createProductController = async (
    req: Request,
    res: Response
) => {
    const product = await createProducts(req.body);

    res.status(201).json({
        success: true,
        data: product,
    });
};

export const getProductsController = async (
    _req: Request,
    res: Response
) => {
    const products = await getProducts();

    res.status(200).json({
        success: true,
        data: products,
    });
};

export const getProductByIdController = async (
    req: Request,
    res: Response
) => {
    const productId = req.params.id;

    if (typeof productId !== "string") {
        res.status(404).json({
            success: false,
            message: "Product not found",
        });
        return;
    }

    const product = await getProductById(productId);

    if (!product) {
        res.status(404).json({
            success: false,
            message: "Product not found",
        });
        return;
    }

    res.status(200).json({
        success: true,
        data: product,
    });
};

export const updateProductController = async (
    req: Request,
    res: Response
) => {
    const productId = req.params.id;

    if (typeof productId !== "string") {
        res.status(404).json({
            success: false,
            message: "Product not found",
        });
        return;
    }

    const product = await updateProduct(
        productId,
        req.body
    );

    res.status(200).json({
        success: true,
        data: product,
    });
};

export const deleteProductController = async (
    req: Request,
    res: Response
) => {
    const productId = req.params.id;

    if (typeof productId !== "string") {
        res.status(404).json({
            success: false,
            message: "Product not found",
        });
        return;
    }

    const result = await deleteProduct(productId);

    res.status(200).json({
        success: true,
        data: result,
    });
};
import express, { Router } from "express";

import data from '../stock-price'
const stockPrice: any = data
export const StockPriceRouter: Router = express.Router();

StockPriceRouter.get('/', (req: any, res: any) => {
    const sku = req.query.sku;
    const product = stockPrice[sku];

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    product.priceString = `$${product.price / 100}`;

    res.json(product);
});
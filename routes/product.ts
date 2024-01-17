import express, { Router } from "express";

import data from '../products'
const products: any = data
export const ProductRouter: Router = express.Router();

ProductRouter.get('/:code', (req: any, res: any) => {
    const code = req.params.code;
    const values = code.split('-');
    const brand: string = `${values[1]} ${values[2]}`;
    const product = products.find((b: any) => b.id === parseInt(values[0]) && b.brand.toLowerCase() === brand.toLocaleLowerCase());

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
});
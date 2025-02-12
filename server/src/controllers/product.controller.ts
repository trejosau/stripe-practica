import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { formatResponse } from '../utils/responseFormatter';

export const registerProduct = (req: Request, res: Response) => {
    const { name, description, photo, price, stock } = req.body;

    try {
        const newProduct = ProductService.registerProduct({
            name,
            description,
            photo,
            price,
            stock,
        });

        res.status(201).json(formatResponse('success', 'Producto creado con éxito', newProduct));
    } catch (error) {
        res.status(400).json(formatResponse('error', 'Error al crear el producto', error instanceof Error ? error.message : error));
    }
};

export const getProduct = (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = ProductService.getProduct(id);
        res.status(200).json(formatResponse('success', 'Producto obtenido con éxito', product));
    } catch (error) {
        res.status(400).json(formatResponse('error', 'Error al obtener el producto', error instanceof Error ? error.message : error));
    }
};
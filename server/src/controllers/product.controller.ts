import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { formatResponse } from '../utils/responseFormatter';

export const registerProduct = (req: Request, res: Response) => {
    const { name, description, photo, price, stock } = req.body;

    try {
        const newProduct = ProductService.registerProduct({
            name,
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

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductService.getProducts();
        console.log('Productos obtenidos:', products);
        res.status(200).json(formatResponse('success', 'Productos obtenidos con éxito', products));
    } catch (error) {
        console.error('Error en getProducts:', error);
        res.status(400).json(formatResponse('error', 'Error al obtener los productos', error instanceof Error ? error.message : error));
    }
};
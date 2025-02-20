import { ProductRepository } from "../repositories/product.repository";
import { ProductCreationAttributes } from "../types/models/Product";

export const ProductService = {
    async registerProduct(product: ProductCreationAttributes) {
        const existingProduct = await ProductRepository.findByName(product.name);
        if (existingProduct) {
            throw new Error('El producto ya existe');
        }

        if (product.stock < 0) {
            throw new Error('El stock debe ser mayor o igual a 0');
        }

        const newProduct = await ProductRepository.create({
            name: product.name,
            photo: product.photo,
            price: product.price,
            stock: product.stock,
        });

        if (!newProduct) {
            throw new Error('No se pudo crear el producto');
        }

        return newProduct;
    },

    async getProduct(id: string) {
        const product = await ProductRepository.findById(id);
        if (!product) {
            throw new Error('No se encontró el producto con el ID proporcionado');
        }
        return product;
    },
    async getProducts() {
        const products = await ProductRepository.findAll();
        if (!products) {
            throw new Error('No se pudieron obtener los productos');
        }
        return products;
    },


};
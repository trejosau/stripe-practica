import Product from '../models/Product.model';
import { ProductCreationAttributes } from '../types/models/Product';

export class ProductRepository {

    static async create(product: ProductCreationAttributes) {
        try {
            return await Product.create(product);
        } catch (error) {
            console.error('Error creating product:', error);
            return null;
        }
    }

  static async findById(productId: string) {
    try {
      return await Product.findByPk(productId);
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

    static async findByName(name: string) {
        try {
            return await Product.findOne({ where: { name } });
        } catch (error) {
            console.error('Error fetching product:', error);
            return null;
        }
    }

}
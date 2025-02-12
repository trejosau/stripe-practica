export interface ProductAttributes {
    id: string;
    name: string;
    description: string;
    photo: string;
    price: number;
    stock: number;
}

export interface ProductCreationAttributes extends Omit<ProductAttributes, 'id'> {}

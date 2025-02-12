export interface OrderProductAttributes {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
}

export interface OrderProductCreationAttributes extends Omit<OrderProductAttributes, 'id'> {}

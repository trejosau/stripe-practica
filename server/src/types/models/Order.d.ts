export interface OrderAttributes {
    id: string;
    client_id: string;
    total: number;
    status: 'pending' | 'delivered' | 'canceled';
}

export interface OrderCreationAttributes extends Omit<OrderAttributes, 'id'> {}

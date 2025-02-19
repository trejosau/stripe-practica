export interface OrderAttributes {
    id: string;
    client_id: string;
    total: number;
    payment_status: 'pending' | 'confirmed' | 'failed';
    status: 'pending' | 'delivered' | 'canceled' | 'completed' | 'in_progress';
}

export interface OrderCreationAttributes extends Omit<OrderAttributes, 'id'> {}

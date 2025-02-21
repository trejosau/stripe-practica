export interface OrderAttributes {
    id: string;
    user_id: string;
    total_amount: number;
    payment_status: 'pending' | 'confirmed' | 'failed';
    stripe_payment_id: string | null; // ID del pago en Stripe

}

export interface OrderCreationAttributes extends Omit<OrderAttributes, 'id'> {}

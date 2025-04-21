export interface OrderProductAttributes {
    id: string;
    order_id: string;
    event_id: string;  // Asegúrate de que esté correcto
    quantity: number;
}

export interface OrderProductCreationAttributes extends Omit<OrderProductAttributes, 'id'> {}

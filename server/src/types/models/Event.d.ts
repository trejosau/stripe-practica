export interface EventAttributes {
    id: string;
    name: string;
    photo: string;
    price: number;
    stock: number;
    description: string;
    location: string;
    date: Date; 
}

export interface EventCreationAttributes extends Omit<EventAttributes, 'id'> {}

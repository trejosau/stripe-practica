export interface ClientAttributes {
    id: string;
    user_id: string;
    name: string;
    lastname: string;
}

export interface ClientCreationAttributes extends Omit<ClientAttributes, 'id'> {}

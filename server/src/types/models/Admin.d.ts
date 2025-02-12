export interface AdminAttributes {
    id: string;
    user_id: string;
}

export interface AdminCreationAttributes extends Omit<AdminAttributes, 'id'> {}

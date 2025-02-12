export interface UserAttributes {
    id: string;
    username: string;
    password: string;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> {}

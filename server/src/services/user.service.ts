import bcrypt from 'bcrypt';
import { UserRepository } from "../repositories/user.repository";
import { UserCreationAttributes } from "../types/models/User";
import { generateToken } from '../utils/jwt';

export const UserService = {
    async registerUser(user: UserCreationAttributes) {
        // Check if the username already exists
        const existingUser = await UserRepository.findByUsername(user.username);
        if (existingUser) {
            throw new Error('El nombre de usuario ya está en uso');
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Create a new user record
        const newUser = await UserRepository.create({
            username: user.username,
            password: hashedPassword,
        });

        // Check if user creation was successful
        if (!newUser) {
            throw new Error('No se pudo crear el usuario');
        }

        return newUser; // Return the new user object
    },

    async loginUser(user: UserCreationAttributes) {
        const existingUser = await UserRepository.findByUsername(user.username);
        if (!existingUser) {
            throw new Error('El usuario no existe');
        }

        const isPasswordCorrect = await bcrypt.compare(user.password, existingUser.password);
        if (!isPasswordCorrect) {
            throw new Error('La contraseña es incorrecta');
        }

        const token = generateToken(existingUser.id);

        const rol = await UserRepository.getRoles(existingUser.id);

        return { user: existingUser, token, rol };
    },
};

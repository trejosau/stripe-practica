import bcrypt from 'bcrypt';
import { UserRepository } from "../repositories/user.repository";
import { UserCreationAttributes } from "../types/models/User";
import { generateToken } from '../utils/jwt';
import Twilio from 'twilio';

const twilioClient = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export const UserService = {
    async registerUser(user: UserCreationAttributes) {
        // Verificar si el usuario ya existe
        const existingUser = await UserRepository.findByUsername(user.username);
        if (existingUser) {
            throw new Error('El nombre de usuario ya está en uso');
        }

        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Crear nuevo usuario con el número de teléfono incluido
        const newUser = await UserRepository.create({
            username: user.username,
            password: hashedPassword,
            phone: user.phone, // Asegúrate de que tu modelo y BD soporten este campo
        });

        if (!newUser) {
            throw new Error('No se pudo crear el usuario');
        }

        // Mensaje de confirmación para el usuario registrado
        const message = `¡Bienvenido a TicketMaistro, ${user.username}! Tu registro fue exitoso.`;

        try {
            console.log('Enviando mensaje de confirmación a:', user.phone);
            console.log('Mensaje:', message);
            await twilioClient.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: '+528715348926', 
            });
        } catch (error) {
            console.error('Error al enviar mensaje de confirmación:', error);
            throw new Error('Error al enviar mensaje de confirmación');
        }

        return newUser;
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

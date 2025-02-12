import { Request, Response } from 'express';
import { ClientService } from '../services/client.service';
import { UserService } from '../services/user.service';
import { formatResponse } from '../utils/responseFormatter';

export const ClientController = {
    async registerClient(req: Request, res: Response) {
        try {
            const { name, lastname, username, password } = req.body;
            if (!name || !lastname || !username || !password) {
                throw new Error('Faltan datos');
            }

            // Primero crear el usuario
            const newUser = await UserService.registerUser({ username, password });

            // Luego crear el cliente usando el user_id
            const newClient = await ClientService.registerClient({
                name,
                lastname,
                user_id: newUser.id,
            });

            res.status(201).json(formatResponse('success', 'Cliente creado correctamente', newClient));
        } catch (error) {
            res.status(400).json(formatResponse('error', 'Error al crear el cliente', error instanceof Error ? error.message : error));
        }
    }
};
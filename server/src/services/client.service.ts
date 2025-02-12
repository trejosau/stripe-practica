import { ClientRepository } from "../repositories/client.repository";
import { ClientCreationAttributes } from "../types/models/Client";

export const ClientService = {
    async registerClient(client: ClientCreationAttributes) {
        const existingClient = await ClientRepository. findByUserId(client.user_id);
        if (existingClient) {
            throw new Error('El cliente ya existe'); // Ese user_id ya tiene este rol
        }

        // Crear el nuevo cliente
        const newClient = await ClientRepository.create({
            name: client.name,
            lastname: client.lastname,
            user_id: client.user_id,
        });

        if (!newClient) {
            throw new Error('No se pudo crear el cliente');
        }

        return newClient;
    }
};

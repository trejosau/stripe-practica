import Client from '../models/Client.model';
import { ClientCreationAttributes } from '../types/models/Client';

export class ClientRepository {

    static async create(client: ClientCreationAttributes) {
        try {
            return await Client.create(client);
        } catch (error) {
            console.error('Error creating client:', error);
            return null;
        }
    }

    static async findByUserId(userId: string) {
        try {
            return await Client.findOne({ where: { user_id: userId } });
        } catch (error) {
            console.error('Error fetching client:', error);
            return null;
        }
    }

    static async userIsClient(userId: string) {
        try {
            const client = await Client.findOne({ where: { user_id: userId } });
            if (client) {
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error fetching client:', error);
            return null;
        }
    }
}
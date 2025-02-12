import  User from '../models/User.model';
import {UserAttributes} from "../types/models/User";
import {UserCreationAttributes} from "../types/models/User";
import Client from "../models/Client.model";
import Admin from "../models/Admin.model";

export class UserRepository {

    static async create(userData: UserCreationAttributes) {
        try {
            return await User.create(userData);
        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }
    }

    static async getRoles(userId: string): Promise<string | null> {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                console.error('User not found');
                return null; // Si no se encuentra el usuario, retornamos null
            }

            // Verificar roles y devolver el correspondiente
            const client = await Client.findOne({ where: { user_id: userId } });
            if (client) return 'client';


            const admin = await Admin.findOne({ where: { user_id: userId } });
            if (admin) return 'admin';

            // Si no se encuentra ningún rol, retornar null
            return null;

        } catch (error) {
            console.error('Error fetching user roles:', error);
            return null; // Devolver null en caso de error
        }
    }



    static async findById(userId: string) {
        try {
            return await User.findByPk(userId);
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }

    static async findByUsername(username: string) {
        try {
            return await User.findOne({ where: { username } });
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    }
}

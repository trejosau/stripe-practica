import Admin from '../models/Admin.model';
import { AdminCreationAttributes } from '../types/models/Admin';

export class AdminRepository {
    static async create(admin: AdminCreationAttributes) {
        try {
            return await Admin.create(admin);
        } catch (error) {
            console.error('Error creating admin:', error);
            return null;
        }
    }

    static async findByUserId(userId: string) {
        try {
            return await Admin.findOne({ where: { user_id: userId } });
        } catch (error) {
            console.error('Error fetching admin:', error);
            return null;
        }
    }

    static async userIsAdmin(userId: string) {
        try {
            const admin = await Admin.findOne({ where: { user_id: userId } });
            if (admin) {
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error fetching admin:', error);
            return null;
        }
    }
}
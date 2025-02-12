import { AdminRepository } from "../repositories/admin.repository";
import { AdminCreationAttributes } from "../types/models/Admin";

export const AdminService = {
    async registerAdmin(admin: AdminCreationAttributes) {
        const existingAdmin = await AdminRepository.findByUserId(admin.user_id);
        if (existingAdmin) {
            throw new Error('El administrador ya existe');
        }

        const newAdmin = await AdminRepository.create({
            user_id: admin.user_id,
        });

        if (!newAdmin) {
            throw new Error('No se pudo crear el administrador');
        }

        return newAdmin;
    }
};

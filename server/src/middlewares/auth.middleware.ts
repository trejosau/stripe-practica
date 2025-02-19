import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { AdminRepository } from '../repositories/admin.repository';
import { ClientRepository } from '../repositories/client.repository';
import { formatResponse } from '../utils/responseFormatter';

// Verificar JWT
const verifyJWT = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    } catch (err) {
        return null;
    }
};

// Middleware para autenticar el JWT y verificar el rol
export const authenticateJWT = (requiredRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json(formatResponse('error', 'No token provided'));
            return; // Detener el flujo aquí si no hay token
        }

        const decoded: any = verifyJWT(token);
        if (!decoded) {
            res.status(401).json(formatResponse('error', 'Invalid or expired token'));
            return; // Detener el flujo si el token no es válido
        }

        // Obtener usuario desde el repositorio
        const user = await UserRepository.findById(decoded.userId);
        if (!user) {
            res.status(404).json(formatResponse('error', 'User not found'));
            return; // Detener el flujo si no se encuentra el usuario
        }

        // Determinar los roles del usuario
        let userRoles: string[] = [];

        if (await AdminRepository.userIsAdmin(user.id)) {
            userRoles.push('admin');
        }
        if (await ClientRepository.userIsClient(user.id)) {
            userRoles.push('client');
        }

        if (userRoles.length === 0) {
            res.status(403).json(formatResponse('error', 'Role not assigned'));
            return; // Detener el flujo si no tiene roles asignados
        }

        // Verificar si al menos uno de los roles está permitido
        const hasPermission = userRoles.some(role => requiredRoles.includes(role));

        if (!hasPermission) {
            res.status(403).json(formatResponse('error', 'No tienes permisos para acceder a esta ruta'));
            return; // Detener el flujo si no tiene permisos
        }

        // @ts-ignore
        req.user = user;
        // @ts-ignore
        req.user.roles = userRoles;
        next();
    };
};

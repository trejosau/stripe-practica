// jwt.ts
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'abcdefghijklmnopqrstuvwxyz1234567890';

// Adjust the type of the payload for the token
export const generateToken = (userId: string) => {
    // Explicitly type the payload as an object
    const payload = { userId };

    // Now pass the payload correctly
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (err) {
        return null;
    }
};

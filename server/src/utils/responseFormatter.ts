// responseFormatter.ts

export const formatResponse = (status: string, message: string, data: any = null) => {
    return {
        status,
        message,
        data,
    };
};

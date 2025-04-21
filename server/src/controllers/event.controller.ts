import { Request, Response } from 'express';
import { EventService } from '../services/event.service';
import { formatResponse } from '../utils/responseFormatter';

export const registerEvent = async (req: Request, res: Response) => {
    const { name, description, photo, price, stock, location, date } = req.body;

    try {
        const newEvent = await EventService.registerEvent({
            name,
            photo,
            price,
            stock,
            description,
            location,
            date,
        });

        res.status(201).json(formatResponse('success', 'Evento creado con éxito', newEvent));
    } catch (error) {
        res.status(400).json(formatResponse('error', 'Error al crear el Evento', error instanceof Error ? error.message : error));
    }
};

export const getEvent = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const event = await EventService.getEvent(id); // Debes esperar la respuesta
        res.status(200).json(formatResponse('success', 'Evento obtenido con éxito', event));
    } catch (error) {
        res.status(400).json(formatResponse('error', 'Error al obtener el Evento', error instanceof Error ? error.message : error));
    }
};

export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await EventService.getEvents(); // Usa await aquí también
        console.log('Eventos obtenidos:', events);
        res.status(200).json(formatResponse('success', 'Eventos obtenidos con éxito', events));
    } catch (error) {
        console.error('Error en getEvents:', error);
        res.status(400).json(formatResponse('error', 'Error al obtener los Eventos', error instanceof Error ? error.message : error));
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedEvent = await EventService.updateEvent(id, req.body); // Usa await aquí también
         res.status(200).json(updatedEvent);
    } catch (error) {
         res.status(400).json({ message: error });
    }
};

// Eliminar un evento específico
export const deleteEvent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await EventService.deleteEvent(id); // Usa await aquí
         res.status(200).send();
         console.log('Evento eliminado con éxito');
    } catch (error) {
         res.status(400).json({ message: error });
    }
};

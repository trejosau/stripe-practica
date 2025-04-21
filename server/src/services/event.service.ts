import e from "express";
import { registerEvent } from "../controllers/event.controller";
import { EventRepository } from "../repositories/event.repository";
import { EventCreationAttributes } from "../types/models/Event";
import { get } from "http";

export const EventService = {
    async registerEvent(event: EventCreationAttributes) {
        const existingProduct = await EventRepository.findByName(event.name);
        if (existingProduct) {
            throw new Error('El producto ya existe');
        }

        if (event.stock < 0) {
            throw new Error('El stock debe ser mayor o igual a 0');
        }

        const newProduct = await EventRepository.create({
            name: event.name,
            photo: event.photo,
            price: event.price,
            stock: event.stock,
            description: event.description,
            location: event.location,
            date: event.date,
        });

        if (!newProduct) {
            throw new Error('No se pudo crear el producto');
        }

        return newProduct;
    },

    async getEvent(id: string) {
        const event = await EventRepository.findById(id);
        if (!event) {
            throw new Error('No se encontró el producto con el ID proporcionado');
        }
        return event;
    },
    async getEvents() {
        const events = await EventRepository.findAll();
        if (!events) {
            throw new Error('No se pudieron obtener los productos');
        }
        return events;
    },
    async updateEvent(id: string, updatedData: EventCreationAttributes) {
        const event = await EventRepository.findById(id);
        if (!event) {
            throw new Error('No se encontró el evento con el ID proporcionado');
        }

        // Actualiza el evento
        const updatedEvent = await EventRepository.update(id, updatedData);
        return updatedEvent;
    },

    async deleteEvent(id: string) {
        const event = await EventRepository.findById(id);
        if (!event) {
            throw new Error('No se encontró el evento con el ID proporcionado');
        }

        await EventRepository.delete(id);
    }
};


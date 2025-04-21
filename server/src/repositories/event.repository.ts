import Event from '../models/Event.model';
import { EventCreationAttributes } from '../types/models/Event';

export class EventRepository {

    static async create(event: EventCreationAttributes) {
        try {
            return await Event.create(event);
        } catch (error) {
            console.error('Error creating event:', error);
            return null;
        }
    }

  static async findById(eventId: string) {
    try {
      return await Event.findByPk(eventId);
    } catch (error) {
      console.error('Error fetching event by id:', error);
      return null;
    }
  }

    static async findByName(name: string) {
        try {
            return await Event.findOne({ where: { name } });
        } catch (error) {
            console.error('Error fetching event by name:', error);
            return null;
        }
    }

    static async findAll() {
        try {
            return await Event.findAll();
        } catch (error) {
            console.error('Error fetching events:', error);
            return null;
        }
    }

    static async update(id: string, updatedData: EventCreationAttributes) {
        try {
            const event = await Event.findByPk(id);
            if (!event) return null;
            return await event.update(updatedData);
        } catch (error) {
            console.error('Error actualizando evento:', error);
            return null;
        }
    }

    static async delete(id: string) {
        try {
            const event = await Event.findByPk(id);
            if (event) {
                await event.destroy();
            }
        } catch (error) {
            console.error('Error eliminando evento:', error);
        }
    }
    

}
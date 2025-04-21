import { Request, Response } from 'express';
import Order from '../models/Order.model';
import OrderProduct from '../models/OrderProduct.model';
import Event from '../models/Event.model';

interface TicketResponse {
  event_id: string;
  event_name: string;
  quantity: number;
}

interface OrderResponse {
  id: string;
  total_amount: number;
  payment_status: string;
  createdAt: string;
  tickets: TicketResponse[];
}

export const getOrderTickets = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const orders = await Order.findAll({
      where: { client_id: userId },
    });

    if (!orders.length) {
      res.status(404).json({ status: 'error', message: 'No se encontraron pedidos' });
      return;
    }

    const ordersWithTickets: OrderResponse[] = await Promise.all(
      orders.map(async (order) => {
        const tickets = await OrderProduct.findAll({
          where: { order_id: order.id },
          include: [
            {
              model: Event,
              attributes: ['id', 'name'],
            },
          ],
        });

        const ticketDetails: TicketResponse[] = tickets.map((ticket) => ({
          event_id: ticket.event_id,
          event_name: ticket.Event!.name, // El "!" asegura que Event no es null (por la relación)
          quantity: ticket.quantity,
        }));

        return {
          id: order.id,
          total_amount: order.total_amount,
          payment_status: order.payment_status,
          tickets: ticketDetails,
        };
      })
    );

    res.status(200).json({ status: 'success', data: ordersWithTickets });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error al obtener los boletos' });
  }
};
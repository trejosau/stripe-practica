import { Router } from 'express';
import { registerEvent, getEvent, getEvents, updateEvent, deleteEvent } from '../controllers/event.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticateJWT(['admin']), registerEvent);

router.get('/', getEvents);

router.get('/:id', getEvent);

router.put('/:id', authenticateJWT(['admin']), updateEvent);

router.delete('/:id', authenticateJWT(['admin']), deleteEvent);

export default router;

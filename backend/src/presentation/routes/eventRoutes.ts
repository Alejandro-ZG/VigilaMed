import { Router } from 'express';
import { EventController } from '../controllers/EventController';

const router = Router();

router.post('/events', EventController.schedule);

export default router;

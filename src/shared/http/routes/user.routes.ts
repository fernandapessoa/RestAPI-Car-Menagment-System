import { Router } from 'express';

const usersRouter = Router();

usersRouter.post('/'); 
usersRouter.get('/me');
usersRouter.patch('/me');
usersRouter.delete('/me');

export { usersRouter };

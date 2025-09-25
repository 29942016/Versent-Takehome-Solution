import express from 'express';
import locationRoutes from './routes/locationRoutes.ts';
import { errorHandler } from './middlewares/errorHandler.ts';
import personRoutes from './routes/personRoutes.ts';

const app = express();

app.use(express.json());

app.use('/api/locations', locationRoutes);
app.use('/api/persons', personRoutes)

app.use(errorHandler);

export default app;
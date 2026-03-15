import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import productRoutes from './routes/productRoutes';

dotenv.config();

// Connect to Database
connectDB();

const app: Application = express();
const PORT: string | number = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.get('/', (req: Request, res: Response) => res.send('API is running...'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

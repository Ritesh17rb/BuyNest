import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';

// Configure env
dotenv.config();

// Database config
connectDB();

// Rest object
const app = express();

// Middlewares

// Universal CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200,
}));

// Middleware to log requests and handle preflight OPTIONS requests
app.use((req, res, next) => {
  console.log(`Handling ${req.method} request to ${req.url}`);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    console.log('Responding to preflight request');
    return res.sendStatus(200); // Respond OK to preflight requests
  }
  next();
});

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to green delight',
  });
});

// PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on PORT : ${PORT}`.bgCyan.white);
});

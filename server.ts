import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import { dbConnection } from './database/config';

// Load environment variables from .env file
dotenv.config();

// bring routes
const blogRoutes = require('./routes/blog');

// app
const app = express();

// db
dbConnection();

// middlewares
app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// routes middleware
app.use('/api', blogRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running in port ${port}: http://localhost:8000`));

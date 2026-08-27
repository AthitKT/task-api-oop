import dotenv from 'dotenv';
// โหลดค่า .env เป็นลำดับแรกสุด
dotenv.config();

import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes';

const app = express();
const port = process.env.PORT || 3000;

// ตั้งค่า CORS ให้อนุญาตทุก Method
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware รับ JSON
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('Task Tracker API is running! 🚀');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';
import cors from 'cors';

// โหลดค่าจากไฟล์ .env
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors()); // อนุญาตให้ Frontend เข้าถึงได้
app.use(express.json());

// Middleware อนุญาตให้ API รับข้อมูลเป็น JSON ได้
app.use(express.json());

// นำ Route ที่เราสร้างมาต่อท้ายด้วย /api/tasks
app.use('/api/tasks', taskRoutes);

// หน้าแรกเอาไว้เช็กว่า Server รันติดไหม
app.get('/', (req, res) => {
  res.send('Task Tracker API is running! 🚀');
});

// สั่งให้เซิร์ฟเวอร์เริ่มทำงาน
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
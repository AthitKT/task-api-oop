import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const router = Router();

// สร้าง Instance ของ Controller (ตามหลัก OOP)
const taskController = new TaskController();

// กำหนด URL Path และชี้ไปที่ Method ใน Controller
router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.patch('/:id/status', taskController.updateTaskStatus);
router.put('/:id', taskController.editTask);
router.delete('/:id', taskController.deleteTask);

export default router;
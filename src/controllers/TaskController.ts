import { Request, Response } from 'express';
import { TaskRepository } from '../repositories/TaskRepository';

export class TaskController {
  // สร้างตัวแทนของ Repository มาใช้งานในคลาสนี้
  private repository: TaskRepository;

  constructor() {
    this.repository = new TaskRepository();
  }

  // Handle: GET /api/tasks
  public getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
      const tasks = await this.repository.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Handle: POST /api/tasks
  public createTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, description } = req.body;
      if (!title) {
        res.status(400).json({ error: 'Title is required' });
        return;
      }
      
      const newTask = await this.repository.create(title, description);
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Handle: PATCH /api/tasks/:id/status
  public updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id as string);
      const { is_completed } = req.body;

      const updatedTask = await this.repository.updateStatus(id, is_completed);
      
      if (!updatedTask) {
        res.status(404).json({ error: 'Task not found' });
        return;
      }
      
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // Handle: PUT /api/tasks/:id
  public editTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string);
      const { title, description } = req.body;
      const updatedTask = await this.repository.updateTask(id, title, description);
      
      if (!updatedTask) { res.status(404).json({ error: 'Task not found' }); return; }
      res.status(200).json(updatedTask);
    } catch (error) { res.status(500).json({ error: 'Internal Server Error' }); }
  };

  // Handle: DELETE /api/tasks/:id
  public deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id as string);
      await this.repository.deleteTask(id);
      res.status(204).send(); // 204 No Content (ลบสำเร็จแต่ไม่มีข้อมูลส่งกลับ)
    } catch (error) { res.status(500).json({ error: 'Internal Server Error' }); }
  };
}
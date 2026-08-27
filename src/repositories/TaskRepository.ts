import pool from '../db';
import { Task } from '../models/Task';

export class TaskRepository {
  
  // 1. ดึงรายการงานทั้งหมด
  async findAll(): Promise<Task[]> {
    const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
    
    // แปลงข้อมูลจาก Database (Row) ให้กลายเป็น Object ของคลาส Task (OOP)
    return result.rows.map(row => 
      new Task(row.id, row.title, row.description, row.is_completed, row.created_at)
    );
  }

  // 2. สร้างงานใหม่
  async create(title: string, description: string | null): Promise<Task> {
    const result = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    
    const row = result.rows[0];
    return new Task(row.id, row.title, row.description, row.is_completed, row.created_at);
  }

  // 3. อัปเดตสถานะงาน
  async updateStatus(id: number, is_completed: boolean): Promise<Task | null> {
    const result = await pool.query(
      'UPDATE tasks SET is_completed = $1 WHERE id = $2 RETURNING *',
      [is_completed, id]
    );

    if (result.rows.length === 0) return null; // ถ้าหา id ไม่เจอให้คืนค่า null

    const row = result.rows[0];
    return new Task(row.id, row.title, row.description, row.is_completed, row.created_at);
  }

  // 4. แก้ไขข้อมูลงาน
  async updateTask(id: number, title: string, description: string | null): Promise<Task | null> {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *',
      [title, description, id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Task(row.id, row.title, row.description, row.is_completed, row.created_at);
  }

  // 5. ลบงาน
  async deleteTask(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}
// คลาส Task ทำหน้าที่เป็นตัวแทนของข้อมูล 1 แถวใน Database
export class Task {
    constructor(
      public id: number,
      public title: string,
      public description: string | null,
      public is_completed: boolean,
      public created_at: Date
    ) {}
  }
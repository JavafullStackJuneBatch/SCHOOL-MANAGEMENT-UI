import { Component } from '@angular/core';
import { ClassroomService } from '../services/classroom.service';
@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrl: './classroom.component.css'
})
export class ClassroomComponent {
  classrooms: any[] = [];

  constructor(private classroomService: ClassroomService) {}

  ngOnInit(): void {
    this.loadClassrooms();
  }

  loadClassrooms(): void {
    this.classroomService.getClassrooms().subscribe(data => {
      this.classrooms = data;
    });
  }

  addClassroom(): void {
    const newClassroom = { name: 'New Classroom', strength: 30 };
    this.classroomService.createClassroom(newClassroom).subscribe(() => {
      this.loadClassrooms();
    });
  }

  updateClassroom(id: number): void {
    const updatedClassroom = { name: 'Updated Classroom', strength: 35 };
    this.classroomService.updateClassroom(id, updatedClassroom).subscribe(() => {
      this.loadClassrooms();
    });
  }

  deleteClassroom(id: number): void {
    this.classroomService.deleteClassroom(id).subscribe(() => {
      this.loadClassrooms();
    });
  }
}

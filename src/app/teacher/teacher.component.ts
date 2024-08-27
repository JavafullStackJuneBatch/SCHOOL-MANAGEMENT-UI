import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { TeacherService } from '../services/teacher.service';
import { ClassroomService } from '../services/classroom.service';

interface Classroom {
  id?: number;
  name: string;
  strength: string;
}

interface Teacher {
  id?: number;
  name: string;
  phoneno: string;
  classroom: Classroom;
}
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {

  teachers: Teacher[] = [];
  teacher: Teacher = {
    name: '',
    phoneno: '',
    classroom: { name: '', strength: '' }
  };

  // classrooms: Classroom[] = [
  //   { name: 'Class A', strength: '30' },
  //   { name: 'Class B', strength: '25' },
  //   { name: 'Class C', strength: '20' }
  // ];
  classrooms: Classroom[] = [];  // Initialize as empty


  constructor(private teacherService: TeacherService,private classroomService: ClassroomService) { }

  ngOnInit(): void {
    this.getTeachers(); // Load existing teachers on initialization
    this.getClassrooms();  // Load classrooms from backend
  }
  // Fetch all classrooms
  getClassrooms(): void {
    this.classroomService.getClassrooms().subscribe((data) => {
      this.classrooms = data;
    });
  }
  // Fetch all teachers
  getTeachers(): void {
    this.teacherService.getTeachers().subscribe((data) => {
      this.teachers = data;
    });
  }

  // Handle form submission to create a new teacher
  onSubmit(): void {
    this.teacherService.createTeacher(this.teacher).subscribe(response => {
      console.log('Teacher created successfully:', response);
      this.getTeachers(); // Refresh the list after adding a new teacher
    }, error => {
      console.error('Error creating teacher:', error);
    });
  }

  // Handle updating a teacher
  updateTeacher(id: number): void {
    this.teacherService.updateTeacher(id, this.teacher).subscribe(response => {
      console.log('Teacher updated successfully:', response);
      this.getTeachers(); // Refresh the list after updating a teacher
    }, error => {
      console.error('Error updating teacher:', error);
    });
  }

  // Handle deleting a teacher
  deleteTeacher(id: number): void {
    this.teacherService.deleteTeacher(id).subscribe(() => {
      console.log('Teacher deleted successfully');
      this.getTeachers(); // Refresh the list after deleting a teacher
    }, error => {
      console.error('Error deleting teacher:', error);
    });
  }
}

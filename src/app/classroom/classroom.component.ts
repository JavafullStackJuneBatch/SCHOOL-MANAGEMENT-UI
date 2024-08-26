import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassroomService } from '../services/classroom.service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
})
export class ClassroomComponent implements OnInit {
  classroomForm: FormGroup;
  classrooms: any[] = [];
  isEditMode = false;
  selectedClassroomId: number | null = null;

  constructor(private fb: FormBuilder, private classroomService: ClassroomService) {
    this.classroomForm = this.fb.group({
      name: ['', Validators.required],
      strength: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadClassrooms();
  }

  loadClassrooms() {
    this.classroomService.getClassrooms().subscribe((data) => {
      this.classrooms = data;
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updateClassroom();
    } else {
      this.addClassroom();
    }
  }

  addClassroom() {
    this.classroomService.createClassroom(this.classroomForm.value).subscribe((data) => {
      this.classrooms.push(data);
      this.classroomForm.reset();
    });
  }

  editClassroom(classroom: any) {
    this.isEditMode = true;
    this.selectedClassroomId = classroom.id;
    this.classroomForm.patchValue({
      name: classroom.name,
      strength: classroom.strength,
    });
  }

  updateClassroom() {
    this.classroomService.updateClassroom(this.selectedClassroomId!, this.classroomForm.value).subscribe((data) => {
      const index = this.classrooms.findIndex((c) => c.id === this.selectedClassroomId);
      this.classrooms[index] = data;
      this.isEditMode = false;
      this.classroomForm.reset();
      this.selectedClassroomId = null;
    });
  }

  deleteClassroom(id: number) {
    this.classroomService.deleteClassroom(id).subscribe(() => {
      this.classrooms = this.classrooms.filter((c) => c.id !== id);
    });
  }

  resetForm() {
    this.classroomForm.reset();
    this.isEditMode = false;
    this.selectedClassroomId = null;
  }
}

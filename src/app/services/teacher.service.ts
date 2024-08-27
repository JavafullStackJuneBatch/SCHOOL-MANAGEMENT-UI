import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'http://localhost:8080/api/teachers'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  // Create a new teacher
  createTeacher(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${this.apiUrl}/create`, teacher);
  }

  // Get a list of all teachers
  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.apiUrl}`);
  }

  // Get a teacher by ID
  getTeacher(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.apiUrl}/${id}`);
  }

  // Update an existing teacher
  updateTeacher(id: number, teacher: Teacher): Observable<Teacher> {
    return this.http.put<Teacher>(`${this.apiUrl}/${id}`, teacher);
  }

  // Delete a teacher by ID
  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

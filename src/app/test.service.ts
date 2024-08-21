import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TestService {

 
  private baseUrl = 'http://localhost:8080/api/classroom';

  constructor(private http: HttpClient) {}

  createClassroom(classroom: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, classroom);
  }

  updateClassroom(id: number, classroom: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, classroom);
  }

  deleteClassroom(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  getClassrooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/list`);
  }
}

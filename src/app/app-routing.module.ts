import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomComponent } from './classroom/classroom.component';
import { TeacherComponent } from './teacher/teacher.component';
// Import other components...

const routes: Routes = [
  { path: 'classroom', component: ClassroomComponent },
  { path: 'teacher', component: TeacherComponent },
  // Add other routes...
  { path: '', redirectTo: '/classroom', pathMatch: 'full' }  // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { TaskListComponent } from './presentation/components/task/task-list/task-list.component';

export const routes: Routes = [
  {path: 'tasks', component: TaskListComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'tasks'},
];

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTodosComponent } from './todos/view-todos/view-todos.component';
import { AddTodoComponent } from './todos/add-todo/add-todo.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'view-todos',
    pathMatch: 'full'
  },
  {
    path: 'view-todos',
    component: ViewTodosComponent
  },
  {
    path: 'add-todo',
    component: AddTodoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import { ToDosService } from '../todos.service';
import { Observable, take } from 'rxjs';
import { ToDo } from '../todo';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'view-todos.component.html'
})
export class ViewTodosComponent implements OnInit {
  todos$?: Observable<ToDo[]>;

  constructor(
    private todoService: ToDosService,
    private router: Router) {}

  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos().pipe(take(1));
  }

  addTodo() {
    this.router.navigate(['add-todo']);
  }

  updateTodo(todo: ToDo) {
    this.todoService.updateTodo(todo).pipe(take(1)).subscribe();
  }
}

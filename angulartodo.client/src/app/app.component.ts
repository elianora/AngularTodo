import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';

interface ToDo {
  id: number;
  isCompleted: boolean;
  description: string;
}

@Component({
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos$ | async">
      <input type="checkbox" [(ngModel)]="todo.isCompleted" />
      {{ todo.description }}
    </div>
    `
})
export class AppComponent implements OnInit {
  todos$?: Observable<ToDo[]>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.todos$ = this.http.get<ToDo[]>('/todos').pipe(take(1));
  }
}

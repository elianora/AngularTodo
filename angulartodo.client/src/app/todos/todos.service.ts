import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToDo } from "./todo";

@Injectable({
  providedIn: 'root'
})
export class ToDosService {
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<ToDo[]>('/todos');
  }

  createTodo(todo: ToDo) {
    return this.http.post<ToDo>('/todos', todo);
  }

  updateTodo(todo: ToDo) {
    return this.http.put('/todos', todo);
  }
}

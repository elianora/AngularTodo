import { Component, OnInit } from "@angular/core";
import { ToDosService } from "../todos.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToDo } from "../todo";
import { take } from "rxjs";

@Component({
  templateUrl: 'add-todo.component.html'
})
export class AddTodoComponent implements OnInit {
  errors: string[] = [];
  addForm?: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: ToDosService,
    private router: Router) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      description: ['', [Validators.required]]
    });
  }

  addTodo(_: any) {
    if (!this.addForm?.valid) {
      return;
    }

    let todo: ToDo = {
      description: this.addForm.get('description')?.value
    };

    this.todoService.createTodo(todo)
      .pipe(take(1))
      .subscribe({
        next: (_) => {
          this.router.navigate(['view-todos']);
        }
      })
  }

  cancel() {
    this.router.navigate(['view-todos']);
  }
}

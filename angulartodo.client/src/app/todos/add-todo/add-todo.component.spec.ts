import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTodoComponent } from './add-todo.component';
import { ToDo } from '../todo';
import { Router } from '@angular/router';

describe('AddToDoComponent', () => {
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let component: AddTodoComponent;
  let fixture: ComponentFixture<AddTodoComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTodoComponent],
      imports: [HttpClientTestingModule],
      providers: [{
        provide: Router,
        useValue: routerSpy
      }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    component.ngOnInit();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require description', () => {
    component.addForm?.setValue({ description: '' });
    expect(component.addForm?.valid).toEqual(false);

    component.addForm?.setValue({ description: 'some description' });
    expect(component.addForm?.valid).toEqual(true);
  });

  it('should navigate back to view todos after successful creation', () => {
    component.addForm?.setValue({ description: 'some description' });

    const mockTodo: ToDo = {
      id: 1,
      isCompleted: false,
      description: 'some description'
    };

    component.addTodo(null);
    const req = httpMock.expectOne('/todos');
    expect(req.request.method).toEqual('POST');
    req.flush(mockTodo);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['view-todos']);
  });
});

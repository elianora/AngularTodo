import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTodosComponent } from './view-todos.component';
import { ToDo } from '../todo';

describe('ViewToDosComponent', () => {
  let component: ViewTodosComponent;
  let fixture: ComponentFixture<ViewTodosComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTodosComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTodosComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve a list of todos on init', () => {
    const mockTodos: ToDo[] = [{
      id: 1,
      isCompleted: false,
      description: 'Some todo'
    }, {
      id: 2,
      isCompleted: true,
      description: 'Another todo'
    }];

    component.ngOnInit();
    fixture.detectChanges();
    const req = httpMock.expectOne('/todos');
    expect(req.request.method).toEqual('GET');
    req.flush(mockTodos);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLivrosComponent } from './create-livros.component';

describe('CreateLivrosComponent', () => {
  let component: CreateLivrosComponent;
  let fixture: ComponentFixture<CreateLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLivrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

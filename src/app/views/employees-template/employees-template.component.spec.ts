import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesTemplateComponent } from './employees-template.component';

describe('EmployeesTemplateComponent', () => {
  let component: EmployeesTemplateComponent;
  let fixture: ComponentFixture<EmployeesTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessesTableComponent } from './processes-table.component';

describe('ProcessesTableComponent', () => {
  let component: ProcessesTableComponent;
  let fixture: ComponentFixture<ProcessesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

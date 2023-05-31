import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionDataComponent } from './version-data.component';

describe('VersionDataComponent', () => {
  let component: VersionDataComponent;
  let fixture: ComponentFixture<VersionDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

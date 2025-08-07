import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyDataTableComponent } from './empty-data-table.component';

describe('EmptyDataTableComponent', () => {
  let component: EmptyDataTableComponent;
  let fixture: ComponentFixture<EmptyDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ EmptyDataTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

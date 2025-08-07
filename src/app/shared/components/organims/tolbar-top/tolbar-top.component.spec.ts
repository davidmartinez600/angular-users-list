import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TolbarTopComponent } from './tolbar-top.component';

describe('TolbarTopComponent', () => {
  let component: TolbarTopComponent;
  let fixture: ComponentFixture<TolbarTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TolbarTopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TolbarTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

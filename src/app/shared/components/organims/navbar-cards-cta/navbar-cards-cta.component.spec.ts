import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCardsCtaComponent } from './navbar-cards-cta.component';

describe('NavbarCardsCtaComponent', () => {
  let component: NavbarCardsCtaComponent;
  let fixture: ComponentFixture<NavbarCardsCtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NavbarCardsCtaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarCardsCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

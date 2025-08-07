import { TestBed } from '@angular/core/testing';
import { UIServiceService } from './uiservice.service';



describe('UIServiceService', () => {
  let service: UIServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

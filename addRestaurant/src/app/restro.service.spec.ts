import { TestBed } from '@angular/core/testing';

import { RestroService } from './restro.service';

describe('RestroService', () => {
  let service: RestroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

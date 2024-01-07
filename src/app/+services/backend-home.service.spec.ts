import { TestBed } from '@angular/core/testing';

import { BackendHomeService } from './backend-home.service';

describe('BackendHomeService', () => {
  let service: BackendHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

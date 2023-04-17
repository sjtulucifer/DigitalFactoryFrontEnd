import { TestBed } from '@angular/core/testing';

import { FactoryTypeService } from './factory-type.service';

describe('FactoryTypeService', () => {
  let service: FactoryTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactoryTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

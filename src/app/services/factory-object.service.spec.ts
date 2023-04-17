import { TestBed } from '@angular/core/testing';

import { FactoryObjectService } from './factory-object.service';

describe('FactoryObjectService', () => {
  let service: FactoryObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FactoryObjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

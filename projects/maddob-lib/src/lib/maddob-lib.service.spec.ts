import { TestBed } from '@angular/core/testing';

import { MaddobLibService } from './maddob-lib.service';

describe('MaddobLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MaddobLibService = TestBed.get(MaddobLibService);
    expect(service).toBeTruthy();
  });
});

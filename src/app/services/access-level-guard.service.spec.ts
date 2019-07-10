import { TestBed } from '@angular/core/testing';

import { AccessLevelGuard } from './access-level-guard.service';

describe('AccessLevelGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccessLevelGuard = TestBed.get(AccessLevelGuard);
    expect(service).toBeTruthy();
  });
});

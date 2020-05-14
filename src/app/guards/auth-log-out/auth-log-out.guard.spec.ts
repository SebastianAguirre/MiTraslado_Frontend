import { TestBed, async, inject } from '@angular/core/testing';

import { AuthLogOutGuard } from './auth-log-out.guard';

describe('AuthLogOutGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthLogOutGuard]
    });
  });

  it('should ...', inject([AuthLogOutGuard], (guard: AuthLogOutGuard) => {
    expect(guard).toBeTruthy();
  }));
});

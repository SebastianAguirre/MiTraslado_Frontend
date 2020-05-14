import { TestBed, async, inject } from '@angular/core/testing';

import { AuthLogInGuard } from './auth-log-in.guard';

describe('AuthLogInGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthLogInGuard]
    });
  });

  it('should ...', inject([AuthLogInGuard], (guard: AuthLogInGuard) => {
    expect(guard).toBeTruthy();
  }));
});

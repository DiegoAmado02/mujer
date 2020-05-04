import { TestBed, async, inject } from '@angular/core/testing';

import { CrudUserGuard } from './crud-user.guard';

describe('CrudUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudUserGuard]
    });
  });

  it('should ...', inject([CrudUserGuard], (guard: CrudUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});

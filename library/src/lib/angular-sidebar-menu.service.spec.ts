import { TestBed } from '@angular/core/testing';

import { AngularSidebarMenuService } from './angular-sidebar-menu.service';

describe('AngularSidebarMenuService', () => {
  let service: AngularSidebarMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularSidebarMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

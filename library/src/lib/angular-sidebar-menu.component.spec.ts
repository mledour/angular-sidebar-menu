import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSidebarMenuComponent } from './angular-sidebar-menu.component';

describe('AngularSidebarMenuComponent', () => {
  let component: AngularSidebarMenuComponent;
  let fixture: ComponentFixture<AngularSidebarMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularSidebarMenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularSidebarMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

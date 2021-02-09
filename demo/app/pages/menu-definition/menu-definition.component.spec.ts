import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDefinitionComponent } from './menu-definition.component';

describe('MenuInterfaceComponent', () => {
  let component: MenuDefinitionComponent;
  let fixture: ComponentFixture<MenuDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuDefinitionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

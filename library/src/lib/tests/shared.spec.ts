import { Component } from '@angular/core';
import { Route } from '@angular/router';

import { Menu, UnAuthorizedVisibility } from '../sidebar-menu.interface';
import { SidebarMenuComponent } from '../sidebar-menu.component';
import { MenuItemComponent } from '../menu-item.component';
import { MenuItemNodeComponent } from '../menu-item-node.component';
import { MenuItemAnchorComponent } from '../menu-item-anchor.component';
import { Role } from '../menu-item-role.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestModuleMetadata } from '@angular/core/testing';

@Component({})
class RoutedStubComponent {}

export const routes: Route[] = [
  {
    path: '**',
    component: RoutedStubComponent,
  },
];

@Component({
  template:
    '<asm-angular-sidebar-menu [menu]="menu" [role]="role" [unAuthorizedVisibility]="unAuthorizedVisibility"></asm-angular-sidebar-menu>',
})
export class WrapperStubComponent {
  menu?: Menu;
  role?: Role;
  unAuthorizedVisibility?: UnAuthorizedVisibility = 'hidden';
}

export const sharedTestingModuleFactory = (): TestModuleMetadata => ({
  declarations: [
    WrapperStubComponent,
    SidebarMenuComponent,
    MenuItemComponent,
    MenuItemNodeComponent,
    MenuItemAnchorComponent,
  ],
  imports: [RouterTestingModule.withRoutes(routes), NoopAnimationsModule],
});

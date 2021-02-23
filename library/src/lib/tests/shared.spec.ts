import { Component } from '@angular/core';
import { Route } from '@angular/router';

import { Menu } from '../sidebar-menu.interface';
import { SidebarMenuComponent } from '../sidebar-menu.component';
import { MenuItemComponent } from '../menu-item.component';
import { MenuItemNodeComponent } from '../menu-item-node.component';
import { MenuItemAnchorComponent } from '../menu-item-anchor.component';
import { MenuItemNodeService } from '../menu-item-node.service';
import { MenuItemAnchorService } from '../menu-item-anchor.service';
import { MenuItemRoleService } from '../menu-item-role.service';
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

@Component({ template: '<asm-angular-sidebar-menu [menu]="menu"></asm-angular-sidebar-menu>' })
export class WrapperStubComponent {
  menu?: Menu;
}

export const sharedTestingModuleFactory = (): TestModuleMetadata => ({
  declarations: [
    WrapperStubComponent,
    SidebarMenuComponent,
    MenuItemComponent,
    MenuItemNodeComponent,
    MenuItemAnchorComponent,
  ],
  providers: [MenuItemNodeService, MenuItemAnchorService, MenuItemRoleService],
  imports: [RouterTestingModule.withRoutes(routes), NoopAnimationsModule],
});

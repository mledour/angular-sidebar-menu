import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarMenuComponent } from './sidebar-menu.component';
import { MenuItemComponent } from './internal/menu-item.component';
import { MenuItemNodeComponent } from './internal/menu-item-node.component';
import { MenuItemAnchorComponent } from './internal/menu-item-anchor.component';

@NgModule({
  declarations: [SidebarMenuComponent, MenuItemComponent, MenuItemNodeComponent, MenuItemAnchorComponent],
  imports: [RouterModule, CommonModule],
  exports: [SidebarMenuComponent],
})
export class SidebarMenuModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarMenuComponent } from './sidebar-menu.component';
import { MenuItemComponent } from './menu-item.component';
import { MenuItemNodeService } from './menu-item-node.service';
import { MenuItemNodeComponent } from './menu-item-node.component';
import { MenuItemAnchorComponent } from './menu-item-anchor.component';
import { MenuItemAnchorService } from './menu-item-anchor.service';

@NgModule({
  declarations: [SidebarMenuComponent, MenuItemComponent, MenuItemNodeComponent, MenuItemAnchorComponent],
  imports: [RouterModule, CommonModule],
  providers: [MenuItemNodeService, MenuItemAnchorService],
  exports: [SidebarMenuComponent],
})
export class SidebarMenuModule {}

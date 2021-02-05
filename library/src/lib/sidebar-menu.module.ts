import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarMenuComponent } from './sidebar-menu.component';
import { SidebarMenuItemComponent } from './sidebar-menu-item.component';

@NgModule({
  declarations: [SidebarMenuComponent, SidebarMenuItemComponent],
  imports: [RouterModule, CommonModule],
  exports: [SidebarMenuComponent],
})
export class SidebarMenuModule {}

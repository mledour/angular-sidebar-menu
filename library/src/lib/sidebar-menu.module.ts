import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarMenuComponent } from './sidebar-menu.component';

@NgModule({
  declarations: [SidebarMenuComponent],
  imports: [RouterModule, CommonModule],
  exports: [SidebarMenuComponent],
})
export class SidebarMenuModule {}

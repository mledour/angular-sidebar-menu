import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SidebarMenuComponent } from './sidebar-menu.component';

import { ItemComponent } from './internal/item.component';
import { NodeComponent } from './internal/node.component';
import { AnchorComponent } from './internal/anchor.component';

@NgModule({
  declarations: [SidebarMenuComponent, ItemComponent, NodeComponent, AnchorComponent],
  imports: [RouterModule, CommonModule],
  exports: [SidebarMenuComponent],
})
export class SidebarMenuModule {}

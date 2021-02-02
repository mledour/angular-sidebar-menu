import { Component, Input } from '@angular/core';

import { Menu, MenuItem, MenuItemLeafRoute } from './sidebar-menu.interface';

@Component({
  selector: 'mk-angular-sidebar-menu',
  templateUrl: 'sidebar-menu.component.html',
  styleUrls: ['sidebar-menu.component.scss'],
})
export class SidebarMenuComponent {
  @Input() menu!: Menu;
}

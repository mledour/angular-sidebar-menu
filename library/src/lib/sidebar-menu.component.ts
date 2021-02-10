import { Component, Input } from '@angular/core';

import { MenuItemAnchorService } from './menu-item-anchor.service';
import { MenuItemNodeService } from './menu-item-node.service';

import { Menu } from './sidebar-menu.interface';

@Component({
  selector: 'asm-angular-sidebar-menu',
  styleUrls: ['sidebar-menu.component.scss'],
  template: `<ul class="asm-menu">
    <li *ngFor="let item of menu" [asm-menu-item]="item"></li>
  </ul>`,
})
export class SidebarMenuComponent {
  @Input() menu!: Menu;
  @Input() set iconClasses(cssClasses: string) {
    this.menuItemAnchorService.iconClasses = cssClasses;
  }
  @Input() set toggleIconClasses(cssClasses: string) {
    this.menuItemNodeService.toggleIconClasses = cssClasses;
  }

  constructor(private menuItemAnchorService: MenuItemAnchorService, private menuItemNodeService: MenuItemNodeService) {}
}

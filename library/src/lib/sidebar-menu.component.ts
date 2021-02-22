import { Component, Input } from '@angular/core';

import { MenuItemAnchorService } from './menu-item-anchor.service';
import { MenuItemNodeService } from './menu-item-node.service';

import { Menu, UnAuthorizedVisibility } from './sidebar-menu.interface';
import { MenuItemRoleService, Role } from './menu-item-role.service';

@Component({
  selector: 'asm-angular-sidebar-menu',
  styleUrls: ['sidebar-menu.component.scss'],
  template: `<ul class="asm-menu">
    <ng-container *ngFor="let item of menu">
      <li *ngIf="menuItemService.showItem$(item.roles) | async" [asm-menu-item]="item" [level]="0"></li>
    </ng-container>
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
  @Input() set role(role: Role) {
    this.menuItemService.role = role;
  }
  @Input() set unAuthorizedVisibility(visibility: UnAuthorizedVisibility) {
    this.menuItemService.unAuthorizedVisibility = visibility;
  }

  constructor(
    private menuItemAnchorService: MenuItemAnchorService,
    private menuItemNodeService: MenuItemNodeService,
    public menuItemService: MenuItemRoleService
  ) {}
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Menu, Modes, UnAuthorizedVisibility } from './sidebar-menu.interface';

import { AnchorService } from './internal/anchor.service';
import { NodeService } from './internal/node.service';
import { RoleService, Role } from './internal/role.service';
import { SearchService } from './internal/search.service';
import { trackByItem } from './internal/utils';

@Component({
  selector: 'asm-angular-sidebar-menu',
  styleUrls: ['sidebar-menu.component.scss'],
  providers: [NodeService, AnchorService, RoleService, SearchService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="asm-menu" [ngClass]="'asm-menu--mode-' + mode" [@.disabled]="disableAnimations">
    <ng-content></ng-content>
    <ul class="asm-menu__node">
      <ng-container *ngFor="let item of menu; trackBy: trackByItem">
        <li
          asm-menu-item
          class="asm-menu-item asm-menu-item--root"
          *ngIf="roleService.showItem$(item.roles) | async"
          [menuItem]="item"
          [level]="0"
        ></li>
      </ng-container>
    </ul>
  </div>`,
})
export class SidebarMenuComponent {
  @Input('menu') set _menu(menu: Menu) {
    this.disableAnimations = true;
    this.menu = menu;

    setTimeout(() => {
      this.disableAnimations = false;
    });
  }
  @Input() set iconClasses(cssClasses: string) {
    this.anchorService.iconClasses = cssClasses;
  }
  @Input() set toggleIconClasses(cssClasses: string) {
    this.nodeService.toggleIconClasses = cssClasses;
  }
  @Input() set role(role: Role | undefined) {
    this.roleService.role = role;
  }
  @Input() set unAuthorizedVisibility(visibility: UnAuthorizedVisibility) {
    this.roleService.unAuthorizedVisibility = visibility;
  }
  @Input() set search(value: string | undefined) {
    this.searchService.search = value;
  }
  @Input() mode = Modes.EXPANDED;

  menu?: Menu;
  modes = Modes;
  disableAnimations = true;
  trackByItem = trackByItem;

  constructor(
    private anchorService: AnchorService,
    private nodeService: NodeService,
    private searchService: SearchService,
    public roleService: RoleService
  ) {}
}

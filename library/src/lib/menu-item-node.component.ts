import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { MenuItemNodeService } from './menu-item-node.service';
import { MenuItem } from './sidebar-menu.interface';
import { MenuItemRoleService } from './menu-item-role.service';
import { openCloseAnimation, rotateAnimation } from './menu-item.animations';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'asm-menu-node',
  animations: [openCloseAnimation, rotateAnimation],
  template: `<div class="asm-menu__item__node" [ngClass]="{ 'asm-menu__item__node--open': isOpen }">
    <asm-menu-anchor [menuItem]="menuItem" (clickAnchor)="onNodeToggleClick()" [isActive]="isActiveChild">
      <i toggleIcon [@rotate]="isOpen" [class]="menuItemNodeService.toggleIconClasses"></i>
    </asm-menu-anchor>
    <ul [@openClose]="isOpen">
      <ng-container *ngFor="let childItem of menuItem.children; let last = last">
        <li
          *ngIf="menuItemRoleService.showItem$(childItem.roles) | async"
          [asm-menu-item]="childItem"
          [level]="level + 1"
          [itemDisabled]="itemDisabled"
          (isItemActive)="isChildItemActive($event, last)"
        ></li>
      </ng-container>
    </ul>
  </div>`,
})
export class MenuItemNodeComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input() menuItem!: MenuItem;
  @Input() level!: number;
  @Input() itemDisabled?: boolean;

  @Output() isItemActive = new EventEmitter<boolean>();

  isOpen?: boolean;
  isActiveChild?: boolean;

  private onDestroy$ = new Subject();
  private isChildActiveDone = false;

  constructor(public menuItemNodeService: MenuItemNodeService, public menuItemRoleService: MenuItemRoleService) {}

  ngOnInit(): void {
    this.menuItemNodeService.openedNode
      .pipe(
        filter(() => !!this.isOpen),
        filter((node) => node.nodeComponent !== this),
        takeUntil(this.onDestroy$)
      )
      .subscribe((node) => {
        if (node.nodeLevel <= this.level) {
          this.isOpen = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  isChildItemActive(isChildActive: boolean, last: boolean): void {
    if (isChildActive) {
      this.isOpen = this.isActiveChild = true;
      this.isItemActive.emit(this.isOpen);
      this.isChildActiveDone = true;
    } else if (last && !this.isChildActiveDone) {
      this.isOpen = this.isActiveChild = false;
      this.isItemActive.emit(this.isOpen);
    }

    if (last) {
      this.isChildActiveDone = false;
    }
  }

  onNodeToggleClick(): void {
    this.isOpen = !this.isOpen;
    this.menuItemNodeService.openedNode.next({ nodeComponent: this, nodeLevel: this.level });
  }
}

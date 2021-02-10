import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { trigger, state, style, animate, transition, AUTO_STYLE, group } from '@angular/animations';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { MenuItemNodeService } from './menu-item-node.service';
import { MenuItem } from './sidebar-menu.interface';

const TRANSITION_DURATION = 300;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'asm-menu-node',
  template: `<div class="asm-menu__item__node" [ngClass]="{ 'asm-menu__item__node--open': isOpen }">
    <asm-menu-anchor [menuItem]="menuItem" (clickAnchor)="onNodeToggleClick()" [isActive]="isActiveChild">
      <i toggleIcon [@rotate]="isOpen" [class]="menuItemNodeService.toggleIconClasses"></i>
    </asm-menu-anchor>
    <ul [@openClose]="isOpen">
      <li
        *ngFor="let childItem of menuItem.children; let last = last"
        [asm-menu-item]="childItem"
        (isItemActive)="isChildItemActive($event, last)"
        [isRootNode]="false"
      ></li>
    </ul>
  </div>`,
  animations: [
    trigger('openClose', [
      state('true', style({ height: AUTO_STYLE })),
      state('false', style({ height: 0, overflow: 'hidden' })),
      transition(':enter', []),
      transition('false => true', animate(`${TRANSITION_DURATION}ms ease-in`, style({ height: AUTO_STYLE }))),
      transition(
        'true => false',
        group([
          animate(`${TRANSITION_DURATION}ms ease-in`, style({ height: 0 })),
          animate(`${TRANSITION_DURATION}ms steps(1, start)`, style({ overflow: 'hidden' })),
        ])
      ),
    ]),
    trigger('rotate', [
      state('true', style({ transform: 'rotate(-90deg)' })),
      transition(':enter', []),
      transition('false <=> true', animate(`${TRANSITION_DURATION}ms ease-out`)),
    ]),
  ],
})
export class MenuItemNodeComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input() menuItem!: MenuItem;
  @Input() isRootNode = true;

  @Output() isItemActive = new EventEmitter<boolean>();

  isOpen?: boolean;
  isActiveChild?: boolean;
  isChildActiveDone = false;

  private onDestroy$ = new Subject();
  private isChildItemActiveTmp = false;

  constructor(public menuItemNodeService: MenuItemNodeService) {}

  ngOnInit(): void {
    this.menuItemNodeService.openedNode
      .pipe(
        filter((sidebarMenuItemComponent) => sidebarMenuItemComponent !== this),
        takeUntil(this.onDestroy$)
      )
      .subscribe((sidebarMenuItemComponent) => {
        this.isOpen = false;
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
    if (this.isRootNode) {
      this.menuItemNodeService.openedNode.next(this);
    }

    this.isOpen = !this.isOpen;
  }
}

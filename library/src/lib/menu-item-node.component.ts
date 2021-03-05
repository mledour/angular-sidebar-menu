import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { combineLatest, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { MenuItemNodeService } from './menu-item-node.service';
import { MenuItem } from './sidebar-menu.interface';
import { MenuItemRoleService } from './menu-item-role.service';
import { openCloseAnimation, rotateAnimation } from './menu-item.animations';
import { MenuItemComponent } from './menu-item.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'asm-menu-node',
  animations: [openCloseAnimation, rotateAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="asm-menu__item__node" [ngClass]="{ 'asm-menu__item__node--open': isOpen }">
    <asm-menu-anchor [menuItem]="menuItem" (clickAnchor)="onNodeToggleClick()" [isActive]="isActiveChild">
      <i toggleIcon [@rotate]="isOpen" [class]="menuItemNodeService.toggleIconClasses"></i>
    </asm-menu-anchor>
    <ul [@openClose]="isOpen">
      <ng-container *ngFor="let childItem of menuItem.children">
        <li
          asm-menu-item
          *ngIf="menuItemRoleService.showItem$(childItem.roles) | async"
          [menuItem]="childItem"
          [level]="level + 1"
          [itemDisabled]="itemDisabled"
        ></li>
      </ng-container>
    </ul>
  </div>`,
})
export class MenuItemNodeComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() menuItem!: MenuItem;
  @Input() level!: number;
  @Input() itemDisabled?: boolean;

  @Output() isActive = new EventEmitter<boolean>();
  @ViewChildren(MenuItemComponent) private menuItemComponent!: QueryList<MenuItemComponent>;

  isOpen = false;
  isActiveChild = false;

  private onDestroy$ = new Subject();

  constructor(
    public menuItemNodeService: MenuItemNodeService,
    public menuItemRoleService: MenuItemRoleService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

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
          this.changeDetectorRef.markForCheck();
        }
      });
  }

  ngAfterViewInit(): void {
    const isChildrenItemsActive = this.menuItemComponent.map((item) => item.isActive$);

    if (isChildrenItemsActive && isChildrenItemsActive.length) {
      combineLatest(isChildrenItemsActive)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((v) => {
          this.isOpen = this.isActiveChild = v.includes(true);
          this.isActive.emit(this.isOpen);
        });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onNodeToggleClick(): void {
    this.isOpen = !this.isOpen;
    this.menuItemNodeService.openedNode.next({ nodeComponent: this, nodeLevel: this.level });
  }
}

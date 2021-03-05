import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Event as RouterEvent, NavigationEnd, Router } from '@angular/router';

import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

import { MenuItemRoleService } from './menu-item-role.service';
import { MenuItem } from './sidebar-menu.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'li[asm-menu-item][menuItem]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngIf="{ disabled: (menuItemRoleService.disableItem$(menuItem.roles) | async) === true } as role"
      [ngSwitch]="true"
      class="asm-menu__item"
      [ngClass]="{ 'asm-menu__item--disabled': role.disabled }"
    >
      <span *ngSwitchCase="!!menuItem.header" class="asm-menu__item__header">{{ menuItem.header }}</span>
      <asm-menu-node
        *ngSwitchCase="!!menuItem.children"
        [menuItem]="menuItem"
        [level]="level"
        [itemDisabled]="itemDisabled || role.disabled"
        (isActive)="onNodeActive($event)"
      ></asm-menu-node>
      <asm-menu-anchor
        *ngSwitchDefault
        [menuItem]="menuItem"
        [itemDisabled]="itemDisabled || !!role.disabled"
      ></asm-menu-anchor>
    </div>
  `,
})
export class MenuItemComponent implements OnInit, OnDestroy {
  @Input() menuItem!: MenuItem;
  @Input() isRootNode = true;
  @Input() level!: number;
  @Input() itemDisabled?: boolean;

  private onDestroy$ = new Subject();
  private isActive = new BehaviorSubject(false);

  isActive$ = this.isActive.asObservable().pipe(distinctUntilChanged(), takeUntil(this.onDestroy$));

  constructor(private router: Router, public menuItemRoleService: MenuItemRoleService) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((e: RouterEvent): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntil(this.onDestroy$)
      )
      .subscribe((e) => {
        this.emitItemActive();
      });

    this.emitItemActive();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onNodeActive(event: boolean): void {
    this.isActive.next(event);
  }

  private emitItemActive(): void {
    if (this.menuItem.route) {
      this.isActive.next(this.isActiveRoute(this.menuItem.route));
    }
  }

  private isActiveRoute(route: string): boolean {
    return this.router.isActive(route, this.isItemLinkExact());
  }

  private isItemLinkExact(): boolean {
    return this.menuItem.linkActiveExact === undefined ? true : this.menuItem.linkActiveExact;
  }
}

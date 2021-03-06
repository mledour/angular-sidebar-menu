import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Event as RouterEvent, NavigationEnd, Router } from '@angular/router';

import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

import { MenuItem } from '../sidebar-menu.interface';

import { RoleService } from './role.service';
import { SearchService } from './search.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'li[asm-menu-item][menuItem]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngIf="{ disabled: (roleService.disableItem$(menuItem.roles) | async) === true } as role"
      [ngSwitch]="true"
      class="asm-menu__item"
      [ngClass]="{ 'asm-menu__item--disabled': role.disabled, 'asm-menu__item--filtered': isItemFiltered }"
    >
      <span *ngSwitchCase="!!menuItem.header" class="asm-menu__item__header">{{ menuItem.header }}</span>
      <asm-menu-node
        *ngSwitchCase="!!menuItem.children"
        [menuItem]="menuItem"
        [level]="level"
        [itemDisabled]="itemDisabled || role.disabled"
        (isActive)="onNodeActive($event)"
        (isFiltered)="onNodeFiltered($event)"
      ></asm-menu-node>
      <asm-menu-anchor
        *ngSwitchDefault
        [menuItem]="menuItem"
        [itemDisabled]="itemDisabled || !!role.disabled"
      ></asm-menu-anchor>
    </div>
  `,
})
export class ItemComponent implements OnInit, OnDestroy {
  @Input() menuItem!: MenuItem;
  @Input() isRootNode = true;
  @Input() level!: number;
  @Input() itemDisabled?: boolean;

  private onDestroy$ = new Subject();
  private isActive = new BehaviorSubject(false);
  private isFiltered = new BehaviorSubject(false);

  isActive$ = this.isActive.asObservable().pipe(distinctUntilChanged(), takeUntil(this.onDestroy$));
  isFiltered$ = this.isFiltered.asObservable().pipe(distinctUntilChanged(), takeUntil(this.onDestroy$));
  isItemFiltered = false;

  constructor(
    private router: Router,
    public roleService: RoleService,
    private searchService: SearchService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.routerItemActiveSubscription();
    this.emitItemActive();
    this.menuSearchSubscription();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onNodeActive(event: boolean): void {
    this.isActive.next(event);
  }

  onNodeFiltered(event: boolean): void {
    this.isFiltered.next(event);
  }

  private routerItemActiveSubscription(): void {
    this.router.events
      .pipe(
        filter((e: RouterEvent): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntil(this.onDestroy$)
      )
      .subscribe((e) => {
        this.emitItemActive();
      });
  }

  private menuSearchSubscription(): void {
    if (!this.menuItem.children) {
      this.searchService.search$.pipe(takeUntil(this.onDestroy$)).subscribe((value) => {
        this.isItemFiltered = this.searchService.filter(value, this.menuItem.label || this.menuItem.header);
        this.isFiltered.next(this.isItemFiltered);
        this.changeDetectorRef.markForCheck();
      });
    }
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

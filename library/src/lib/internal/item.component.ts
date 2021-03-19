import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
  HostBinding,
} from '@angular/core';
import { Event as RouterEvent, NavigationEnd, Router } from '@angular/router';

import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';

import { MenuItem } from '../sidebar-menu.interface';

import { RoleService } from './role.service';
import { SearchService } from './search.service';
import { rotateAnimation } from './node.animations';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'li[asm-menu-item][menuItem]',
  animations: [rotateAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container [ngSwitch]="true">
      <span *ngSwitchCase="!!menuItem.header" class="asm-menu-item__header">{{ menuItem.header }}</span>
      <asm-menu-anchor
        *ngSwitchCase="!menuItem.children && !menuItem.header"
        class="asm-menu-anchor"
        [menuItem]="menuItem"
        [disable]="disable || isItemDisabled"
      ></asm-menu-anchor>
      <ng-container *ngSwitchCase="!!menuItem.children">
        <asm-menu-anchor
          class="asm-menu-anchor"
          [ngClass]="{ 'asm-menu-anchor--open': node.isOpen }"
          [menuItem]="menuItem"
          (clickAnchor)="node.onNodeToggleClick()"
          [isActive]="node.isActiveChild"
          ><i toggleIcon [@rotate]="node.isOpen" [class]="node.nodeService.toggleIconClasses"></i
        ></asm-menu-anchor>
        <asm-menu-node
          #node
          class="asm-menu-node"
          [menuItem]="menuItem"
          [level]="level"
          [disable]="disable || isItemDisabled"
          (isActive)="onNodeActive($event)"
          (isFiltered)="onNodeFiltered($event)"
        ></asm-menu-node>
      </ng-container>
    </ng-container>
  `,
})
export class ItemComponent implements OnInit, OnDestroy {
  @Input() menuItem!: MenuItem;
  @Input() isRootNode = true;
  @Input() level!: number;
  @Input() disable = false;

  @HostBinding('class.asm-menu-item--filtered') get filtered(): boolean {
    return this.isItemFiltered;
  }
  @HostBinding('class.asm-menu-item--disabled') get disabled(): boolean {
    return this.isItemDisabled || this.disable;
  }

  private onDestroy$ = new Subject();
  private isActive = new BehaviorSubject(false);
  private isFiltered = new BehaviorSubject(false);

  isActive$ = this.isActive.asObservable().pipe(distinctUntilChanged(), takeUntil(this.onDestroy$));
  isFiltered$ = this.isFiltered.asObservable().pipe(distinctUntilChanged(), takeUntil(this.onDestroy$));
  isItemFiltered = false;
  isItemDisabled = false;

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
    this.disabledItemSubscription();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onNodeActive(event: boolean): void {
    this.isActive.next(event);
  }

  onNodeFiltered(event: boolean): void {
    this.isItemFiltered = event;
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
      this.searchService.search$.pipe(takeUntil(this.onDestroy$)).subscribe((search) => {
        this.isItemFiltered = this.searchService.filter(search, this.menuItem.label || this.menuItem.header);
        this.isFiltered.next(this.isItemFiltered);
        this.changeDetectorRef.markForCheck();
      });
    }
  }

  private disabledItemSubscription(): void {
    this.roleService
      .disableItem$(this.menuItem.roles)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((disabled) => (this.isItemDisabled = disabled));
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

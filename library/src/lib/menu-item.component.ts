import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Event as RouterEvent, NavigationEnd, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { MenuItem } from './sidebar-menu.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'li[asm-menu-item]',
  styleUrls: ['sidebar-menu.component.scss'],
  template: `
    <div class="asm-menu__item" [ngSwitch]="true">
      <span *ngSwitchCase="!!menuItem.header" class="asm-menu__item__header">{{ menuItem.header }}</span>
      <asm-menu-node
        *ngSwitchCase="!!menuItem.children"
        [menuItem]="menuItem"
        [level]="level"
        (isItemActive)="isChildItemActive($event)"
      ></asm-menu-node>
      <asm-menu-anchor *ngSwitchDefault [menuItem]="menuItem"></asm-menu-anchor>
    </div>
  `,
})
export class MenuItemComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('asm-menu-item') menuItem!: MenuItem;
  @Input() isRootNode = true;
  @Input() level!: number;

  @Output() isItemActive = new EventEmitter<boolean>();

  private onDestroy$ = new Subject();

  constructor(private router: Router) {}

  isChildItemActive(event: boolean): void {
    this.isItemActive.emit(event);
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((e: RouterEvent): e is NavigationEnd => e instanceof NavigationEnd),
        takeUntil(this.onDestroy$)
      )
      .subscribe(() => {
        if (this.menuItem.route) {
          this.isItemActive.emit(this.router.isActive(this.menuItem.route, true));
        } else if (this.menuItem.url) {
          this.isItemActive.emit(false);
        }
      });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

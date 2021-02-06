import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Event as RouterEvent, NavigationEnd, Router, RouterLinkActive } from '@angular/router';
import { Subject } from 'rxjs';

import { filter, takeUntil } from 'rxjs/operators';
import { SidebarMenuItemService } from './sidebar-menu-item.service';

import { MenuItem } from './sidebar-menu.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'li[asm-sidebar-menu-item]',
  templateUrl: 'sidebar-menu-item.component.html',
  styleUrls: ['sidebar-menu-item.component.scss'],
})
export class SidebarMenuItemComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('asm-sidebar-menu-item') menuItem!: MenuItem;
  @Input() iconClasses: string | undefined;
  @Input() toggleIconClasses: string | undefined;
  @Input() isRootNode = true;

  @Output() isItemActive = new EventEmitter<boolean>();

  isOpen = false;
  isActiveChild = false;

  private onDestroy$ = new Subject();

  constructor(private router: Router, private sidebarMenuItemService: SidebarMenuItemService) {}

  ngOnInit(): void {
    if (this.menuItem.route) {
      this.router.events.pipe(filter((e: RouterEvent): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => {
        this.isItemActive.emit(this.router.isActive(this.menuItem.route as string, true));
      });
    }

    if (this.menuItem.children) {
      this.sidebarMenuItemService.openedNode
        .pipe(
          filter((sidebarMenuItemComponent) => sidebarMenuItemComponent !== this),
          takeUntil(this.onDestroy$)
        )
        .subscribe((sidebarMenuItemComponent) => {
          this.isOpen = false;
        });
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  isChildItemActive(event: boolean): void {
    this.isOpen = this.isActiveChild = event;
    this.isItemActive.emit(event);
  }

  onNodeToggleClick(): void {
    if (this.isRootNode) {
      this.sidebarMenuItemService.openedNode.next(this);
    }

    this.isOpen = !this.isOpen;
  }

  readonly asMenuItem = (menuItem: unknown): MenuItem => menuItem as MenuItem;
}

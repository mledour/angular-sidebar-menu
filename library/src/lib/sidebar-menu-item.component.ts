import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Event as RouterEvent, NavigationEnd, Router, RouterLinkActive } from '@angular/router';

import { filter } from 'rxjs/operators';

import { MenuItem } from './sidebar-menu.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'li[mk-sidebar-menu-item]',
  templateUrl: 'sidebar-menu-item.component.html',
  styleUrls: ['sidebar-menu-item.component.scss'],
})
export class SidebarMenuItemComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('mk-sidebar-menu-item') menuItem!: MenuItem;
  @Input() iconClasses: string | undefined;
  @Input() toggleIconClasses: string | undefined;

  @ViewChild('rla') rla?: RouterLinkActive;

  @Output() isItemActive = new EventEmitter<boolean>();

  public isOpen = false;
  public isActiveChild = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.menuItem.route) {
      this.router.events.pipe(filter((e: RouterEvent): e is NavigationEnd => e instanceof NavigationEnd)).subscribe(() => {
        this.isItemActive.emit(this.router.isActive(this.menuItem.route as string, true));
      });
    }
  }

  isChildItemActive(event: boolean): void {
    this.isOpen = this.isActiveChild = event;
    this.isItemActive.emit(event);
  }

  public readonly asMenuItem = (x: unknown): MenuItem => x as MenuItem;
}

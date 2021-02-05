import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { NavigationEnd, Router, RouterLinkActive, Event as RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

import { Menu, MenuItem, MenuItemLeafRoute } from './sidebar-menu.interface';

@Component({
  selector: 'mk-angular-sidebar-menu',
  template: `<ul class="asm-menu">
    <li *ngFor="let item of menu" [mk-sidebar-menu-item]="item" [toggleIconClasses]="toggleIconClasses" [iconClasses]="iconClasses"></li>
  </ul>`,
  styles: [
    `
      .asm-menu {
        list-style: none;
        margin: 0;
        padding: 0;
      }
    `,
  ],
})
export class SidebarMenuComponent {
  @Input() menu!: Menu;
  @Input() iconClasses: string | undefined;
  @Input() toggleIconClasses: string | undefined;
}

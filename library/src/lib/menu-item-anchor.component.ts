import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MenuItem } from './sidebar-menu.interface';
import { MenuItemAnchorService } from './menu-item-anchor.service';

@Component({
  selector: 'asm-menu-anchor',
  template: `<ng-container [ngSwitch]="true">
      <a
        *ngSwitchCase="!!menuItem.children"
        class="asm-menu__item__anchor"
        [ngClass]="{ 'asm-menu__item__anchor--active': isActive }"
        (click)="clickAnchor.emit()"
      >
        <ng-container *ngTemplateOutlet="innerItem"></ng-container>
      </a>
      <a
        *ngSwitchCase="!!menuItem.route || menuItem.route === ''"
        class="asm-menu__item__anchor"
        [routerLink]="menuItem.route"
        routerLinkActive="asm-menu__item__anchor--active"
        [routerLinkActiveOptions]="{ exact: true }"
      >
        <ng-container *ngTemplateOutlet="innerItem"></ng-container>
      </a>
      <a *ngSwitchCase="!!menuItem.url" [href]="menuItem.url" [target]="menuItem.target" class="asm-menu__item__anchor">
        <ng-container *ngTemplateOutlet="innerItem"></ng-container>
      </a>
    </ng-container>

    <ng-template #innerItem>
      <i
        *ngIf="menuItem.iconClasses || menuItemAnchorService.iconClasses"
        [class]="menuItem.iconClasses || menuItemAnchorService.iconClasses"
        class="asm-menu__item__icon"
      ></i>
      <span class="asm-menu__item__label">{{ menuItem.label }}</span>
      <span
        *ngIf="menuItem.badges || menuItem.children"
        class="asm-menu__item__pull"
        [ngClass]="{ 'asm-badges': menuItem.badges, 'asm-toggle': menuItem.children }"
      >
        <span *ngFor="let badge of menuItem.badges" [class]="badge.classes" class="asm-badges__badge">{{ badge.label }}</span>
        <span class="asm-toggle__icon"><ng-content select="[toggleIcon]"></ng-content></span>
      </span>
    </ng-template>`,
})
export class MenuItemAnchorComponent {
  @Input() menuItem!: MenuItem;
  @Input() isActive?: boolean;
  @Output() clickAnchor = new EventEmitter<void>();

  constructor(public menuItemAnchorService: MenuItemAnchorService) {}
}

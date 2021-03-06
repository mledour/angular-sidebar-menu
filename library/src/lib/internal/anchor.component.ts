import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { MenuItem } from '../sidebar-menu.interface';

import { AnchorService } from './anchor.service';

@Component({
  selector: 'asm-menu-anchor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-container [ngSwitch]="true">
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
        [routerLink]="disable ? undefined : menuItem.route"
        [routerLinkActive]="disable ? '' : 'asm-menu__item__anchor--active'"
        [routerLinkActiveOptions]="{ exact: menuItem.linkActiveExact === undefined ? true : menuItem.linkActiveExact }"
      >
        <ng-container *ngTemplateOutlet="innerItem"></ng-container>
      </a>
      <a *ngSwitchCase="!!menuItem.url" [href]="menuItem.url" [target]="menuItem.target" class="asm-menu__item__anchor">
        <ng-container *ngTemplateOutlet="innerItem"></ng-container>
      </a>
    </ng-container>

    <ng-template #innerItem>
      <i
        *ngIf="menuItem.iconClasses || anchorService.iconClasses"
        [class]="menuItem.iconClasses || anchorService.iconClasses"
        class="asm-menu__item__icon"
      ></i>
      <span class="asm-menu__item__label">{{ menuItem.label }}</span>
      <span
        *ngIf="menuItem.badges || menuItem.children"
        class="asm-menu__item__pull"
        [ngClass]="{ 'asm-badges': menuItem.badges, 'asm-toggle': menuItem.children }"
      >
        <span *ngFor="let badge of menuItem.badges" [class]="badge.classes" class="asm-badges__badge">{{
          badge.label
        }}</span>
        <span class="asm-toggle__icon"><ng-content select="[toggleIcon]"></ng-content></span>
      </span>
    </ng-template>`,
})
export class AnchorComponent {
  @Input() menuItem!: MenuItem;
  @Input() isActive?: boolean;
  @Input() disable = false;

  @Output() clickAnchor = new EventEmitter<void>();

  constructor(public anchorService: AnchorService) {}
}

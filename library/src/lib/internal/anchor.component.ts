import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostBinding, ViewChild } from '@angular/core';
import { RouterLinkActive } from '@angular/router';

import { MenuItem } from '../sidebar-menu.interface';

import { AnchorService } from './anchor.service';

@Component({
  selector: 'asm-menu-anchor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-container [ngSwitch]="true">
      <a *ngSwitchCase="!!menuItem.children" (click)="clickAnchor.emit()">
        <ng-container *ngTemplateOutlet="innerItem"></ng-container>
      </a>
      <a
        *ngSwitchCase="!!menuItem.route || menuItem.route === ''"
        [routerLink]="disable ? undefined : menuItem.route"
        routerLinkActive
        #rla="routerLinkActive"
        [routerLinkActiveOptions]="{ exact: menuItem.linkActiveExact === undefined ? true : menuItem.linkActiveExact }"
      >
        <ng-container *ngTemplateOutlet="innerItem"></ng-container>
      </a>
      <a *ngSwitchCase="!!menuItem.url" [href]="menuItem.url" [target]="menuItem.target">
        <ng-container *ngTemplateOutlet="innerItem"></ng-container>
      </a>
    </ng-container>

    <ng-template #innerItem>
      <i
        *ngIf="menuItem.iconClasses || anchorService.iconClasses"
        [class]="menuItem.iconClasses || anchorService.iconClasses"
        class="asm-menu-anchor__icon"
      ></i>
      <span class="asm-menu-anchor__label">{{ menuItem.label }}</span>
      <span
        *ngIf="menuItem.badges || menuItem.children"
        class="asm-menu-anchor__pull"
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

  @HostBinding('class.asm-menu-anchor--active') get active(): boolean {
    return this.isActive || (!!this.routerLinActive?.isActive && !this.disable);
  }

  @ViewChild('rla') private routerLinActive?: RouterLinkActive;

  constructor(public anchorService: AnchorService) {}
}

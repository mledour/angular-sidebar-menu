import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Event as RouterEvent, NavigationEnd, Router, RouterLinkActive } from '@angular/router';
import { trigger, state, style, animate, transition, AUTO_STYLE, AnimationEvent, group, keyframes } from '@angular/animations';

import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { SidebarMenuItemService } from './sidebar-menu-item.service';
import { MenuItem } from './sidebar-menu.interface';

const TRANSITION_DURATION = 300;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'li[asm-sidebar-menu-item]',
  templateUrl: 'sidebar-menu-item.component.html',
  styleUrls: ['sidebar-menu-item.component.scss'],
  animations: [
    trigger('openClose', [
      state('true', style({ height: AUTO_STYLE })),
      state('false', style({ height: 0, overflow: 'hidden' })),
      transition(':enter', []),
      transition('false => true', animate(`${TRANSITION_DURATION}ms ease-in`, style({ height: AUTO_STYLE }))),
      transition(
        'true => false',
        group([
          animate(`${TRANSITION_DURATION}ms ease-in`, style({ height: 0 })),
          animate(`${TRANSITION_DURATION}ms steps(1, start)`, style({ overflow: 'hidden' })),
        ])
      ),
    ]),
    trigger('rotate', [
      state('true', style({ transform: 'rotate(-90deg)' })),
      transition(':enter', []),
      transition('false <=> true', animate(`${TRANSITION_DURATION}ms ease-out`)),
    ]),
  ],
})
export class SidebarMenuItemComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('asm-sidebar-menu-item') menuItem!: MenuItem;
  @Input() iconClasses: string | undefined;
  @Input() toggleIconClasses: string | undefined;
  @Input() isRootNode = true;

  @Output() isItemActive = new EventEmitter<boolean>();

  isOpen?: boolean;
  isActiveChild = false;
  disableAnimation = true;
  isAnimating = false;

  private onDestroy$ = new Subject();

  constructor(private router: Router, private sidebarMenuItemService: SidebarMenuItemService) {}

  ngOnInit(): void {
    if (this.menuItem.route) {
      this.router.events
        .pipe(
          filter((e: RouterEvent): e is NavigationEnd => e instanceof NavigationEnd),
          takeUntil(this.onDestroy$)
        )
        .subscribe(() => {
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

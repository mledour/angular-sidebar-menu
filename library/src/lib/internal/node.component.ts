import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';

import { combineLatest, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { MenuItem } from '../sidebar-menu.interface';

import { NodeService } from './node.service';
import { RoleService } from './role.service';
import { openCloseAnimation } from './node.animations';
import { ItemComponent } from './item.component';
import { trackByItem } from './utils';

@Component({
  selector: 'asm-menu-node',
  animations: [openCloseAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ul [@openClose]="isOpen">
    <li *ngIf="level === 0" class="asm-menu-item">
      <span class="asm-menu-node__label">{{ menuItem.label }}</span>
    </li>
    <ng-container *ngFor="let childItem of menuItem.children; trackBy: trackByItem">
      <li
        asm-menu-item
        class="asm-menu-item"
        *ngIf="roleService.showItem$(childItem.roles) | async"
        [menuItem]="childItem"
        [level]="level + 1"
        [disable]="disable"
      ></li>
    </ng-container>
  </ul>`,
})
export class NodeComponent implements AfterViewInit, OnDestroy {
  @Input() menuItem!: MenuItem;
  @Input() level!: number;
  @Input() disable = false;

  @Output() isActive = new EventEmitter<boolean>();
  @Output() isFiltered = new EventEmitter<boolean>();

  @HostBinding('class.asm-menu-node--open') get open(): boolean {
    return this.isOpen;
  }

  @ViewChildren(ItemComponent) private menuItemComponents!: QueryList<ItemComponent>;

  isOpen = false;
  isActiveChild = false;
  trackByItem = trackByItem;

  private onDestroy$ = new Subject();

  constructor(
    public nodeService: NodeService,
    public roleService: RoleService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.openedNodeSubscription();
    this.activeItemsSubscription();
    this.filterItemsSubscription();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onNodeToggleClick(): void {
    this.isOpen = !this.isOpen;
    this.nodeService.openedNode.next({ nodeComponent: this, nodeLevel: this.level });
    this.changeDetectorRef.markForCheck();
  }

  private activeItemsSubscription(): void {
    const isChildrenItemsActive = this.menuItemComponents.map((item) => item.isActive$);

    if (isChildrenItemsActive && isChildrenItemsActive.length) {
      combineLatest(isChildrenItemsActive)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((itemsActiveState) => {
          this.isOpen = this.isActiveChild = itemsActiveState.includes(true);
          this.isActive.emit(this.isOpen);
        });
    }
  }

  private filterItemsSubscription(): void {
    const isChildrenItemsFiltered = this.menuItemComponents.map((item) => item.isFiltered$);

    if (isChildrenItemsFiltered && isChildrenItemsFiltered.length) {
      combineLatest(isChildrenItemsFiltered)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((itemsFilteredState) => {
          const isItemsFiltered = itemsFilteredState.includes(false) === false;
          this.isFiltered.emit(isItemsFiltered);
        });
    }
  }

  private openedNodeSubscription(): void {
    this.nodeService.openedNode
      .pipe(
        filter(() => !!this.isOpen),
        filter((node) => node.nodeComponent !== this),
        takeUntil(this.onDestroy$)
      )
      .subscribe((node) => {
        if (node.nodeLevel <= this.level) {
          this.isOpen = false;
          this.changeDetectorRef.markForCheck();
        }
      });
  }
}

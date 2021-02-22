import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SidebarMenuComponent } from '../sidebar-menu.component';
import { Menu } from '../sidebar-menu.interface';
import { MenuItemComponent } from '../menu-item.component';
import { MenuItemNodeService } from '../menu-item-node.service';
import { customMatchers } from './custom.matchers.spec';
import { cssSelectors } from './css-selectors.spec';
import { clickElement, menuLengthRecursive } from './utils.spec';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MenuItemAnchorService } from '../menu-item-anchor.service';
import { MenuItemNodeComponent } from '../menu-item-node.component';
import { MenuItemAnchorComponent } from '../menu-item-anchor.component';
import { MenuItemRoleService } from '../menu-item-role.service';

@Component({})
class RoutedStubComponent {}

const routes: Route[] = [
  {
    path: '**',
    component: RoutedStubComponent,
  },
];

const menu: Menu = [
  {
    route: '',
    label: 'home',
  },
  {
    label: 'node 1',
    children: [
      {
        label: 'node 1 children 1',
        route: '/node-1-children-1',
      },
      {
        label: 'node 1 children 2',
        children: [
          {
            label: 'node 2 children 1',
            route: '/node-2-children-1',
          },
          {
            label: 'node 2 children 2',
            route: '/node-2-children-2',
          },
          {
            label: 'node 2 children 3',
            children: [
              {
                label: 'node 3 children 1',
                route: '/node-3-children-1',
              },
            ],
          },
          {
            label: 'node 2 children 4',
            children: [
              {
                label: 'node 3 children 1',
                url: '/node-3-children-1',
              },
            ],
          },
        ],
      },
      {
        label: 'node 1 children 3',
        route: '/node-1-children-3',
      },
      {
        label: 'node 1 children 4',
        children: [
          {
            label: 'node 2 children 41',
            route: '/node-2-children-41',
          },
        ],
      },
    ],
  },
];

@Component({ template: '<asm-angular-sidebar-menu [menu]="menu"></asm-angular-sidebar-menu>' })
class WrapperStubComponent {
  menu: Menu = menu;
}

describe('Sub Menu', () => {
  let hostComponent: WrapperStubComponent;
  let hostFixture: ComponentFixture<WrapperStubComponent>;
  let debugElement: DebugElement;
  let router: Router;

  beforeEach(async () => {
    jasmine.addMatchers(customMatchers);

    await TestBed.configureTestingModule({
      declarations: [
        WrapperStubComponent,
        SidebarMenuComponent,
        MenuItemComponent,
        MenuItemNodeComponent,
        MenuItemAnchorComponent,
      ],
      providers: [MenuItemNodeService, MenuItemAnchorService, MenuItemRoleService],
      imports: [RouterTestingModule.withRoutes(routes), NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(fakeAsync(() => {
    hostFixture = TestBed.createComponent(WrapperStubComponent);
    hostComponent = hostFixture.componentInstance;
    router = TestBed.inject(Router);
    debugElement = hostFixture.debugElement.query(By.directive(SidebarMenuComponent));

    router.initialNavigation();
    hostFixture.detectChanges();
    tick();
  }));

  it('should create 5 menu items', () => {
    expect(debugElement.queryAll(By.css(cssSelectors.items)).length).toEqual(menuLengthRecursive(menu));
  });

  it('should click third level item and navigate', fakeAsync(() => {
    expect(debugElement.queryAll(By.css(cssSelectors.activatedItems)).length).toEqual(1);

    // Open first level node
    clickElement(debugElement, menu[1].label, hostFixture);
    expect(debugElement.queryAll(By.css(cssSelectors.openedItems)).length).toEqual(1);
    expect(debugElement.query(By.css(cssSelectors.openedItemsLabels))).toHaveText(menu[1].label);
    expect(router.url).toEqual('/');

    // Open second level node
    clickElement(debugElement, menu[1].children?.[1].label, hostFixture);
    expect(debugElement.queryAll(By.css(cssSelectors.openedItems)).length).toEqual(2);
    expect(debugElement.queryAll(By.css(cssSelectors.openedItemsLabels))[1]).toHaveText(menu[1].children?.[1].label);
    expect(router.url).toEqual('/');

    // Click third level item
    clickElement(debugElement, menu[1].children?.[1].children?.[0].label, hostFixture);
    expect(debugElement.queryAll(By.css(cssSelectors.openedItems)).length).toEqual(2);
    expect(router.url).toEqual(menu[1].children?.[1].children?.[0].route as string);

    // Test if all ancestors are active
    let itemsActive = debugElement.queryAll(By.css(cssSelectors.activatedItemsLabels));
    expect(itemsActive.length).toEqual(3);
    expect(itemsActive[0]).toHaveText(menu[1].label);
    expect(itemsActive[1]).toHaveText(menu[1].children?.[1].label);
    expect(itemsActive[2]).toHaveText(menu[1].children?.[1].children?.[0].label);

    // Go back to first menu item to check others are collapsed and deactivated
    clickElement(debugElement, menu[0].label, hostFixture);
    itemsActive = debugElement.queryAll(By.css(cssSelectors.activatedItemsLabels));
    expect(router.url).toEqual('/');
    expect(itemsActive.length).toEqual(1);
    expect(itemsActive[0]).toHaveText(menu[0].label);
    expect(debugElement.queryAll(By.css(cssSelectors.openedItems)).length).toEqual(0);
  }));

  it('should close other items on item click', fakeAsync(() => {
    clickElement(debugElement, menu[1].label, hostFixture);
    clickElement(debugElement, menu[1].children?.[1].label, hostFixture);
    expect(debugElement.queryAll(By.css(cssSelectors.openedItems)).length).toEqual(2);

    clickElement(debugElement, menu[1].children?.[3].label, hostFixture);
    expect(debugElement.queryAll(By.css(cssSelectors.openedItems)).length).toEqual(2);
  }));

  it('should toggle item', fakeAsync(() => {
    clickElement(debugElement, menu[1].label, hostFixture);
    clickElement(debugElement, menu[1].children?.[1].label, hostFixture);
    expect(debugElement.queryAll(By.css(cssSelectors.openedItems)).length).toEqual(2);

    clickElement(debugElement, menu[1].children?.[1].label, hostFixture);
    expect(debugElement.queryAll(By.css(cssSelectors.openedItems)).length).toEqual(1);
  }));
});

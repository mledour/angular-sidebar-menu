import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SidebarMenuComponent } from '../sidebar-menu.component';
import { Menu, MenuItemBadge, MenuItemLeafRoute } from '../sidebar-menu.interface';
import { MenuItemComponent } from '../menu-item.component';
import { MenuItemNodeService } from '../menu-item-node.service';
import { customMatchers } from './custom.matchers.spec';
import { cssSelectors } from './css-selectors.spec';
import { clickElement, navigateTo } from './utils.spec';
import { MenuItemAnchorService } from '../menu-item-anchor.service';
import { MenuItemNodeComponent } from '../menu-item-node.component';
import { MenuItemAnchorComponent } from '../menu-item-anchor.component';
import { MenuItemRoleService } from '../menu-item-role.service';

@Component({})
class RoutedStubComponent {}

const routes: Route[] = [
  {
    path: '',
    component: RoutedStubComponent,
  },
  {
    path: 'second',
    component: RoutedStubComponent,
  },
  {
    path: 'third',
    component: RoutedStubComponent,
  },
];

const menu: Menu = [
  {
    route: '',
    label: 'home',
  },
  {
    route: '/second',
    label: 'Second',
    badges: [
      {
        label: 'test',
        classes: 'class-1 class-2',
      },
      {
        label: 'test 2',
        classes: 'class-3 class-4',
      },
    ],
  },
  {
    route: '/third',
    label: 'Third',
    iconClasses: 'test-icon icon',
  },
  {
    header: 'Separator',
  },
];

@Component({ template: '<asm-angular-sidebar-menu [menu]="menu"></asm-angular-sidebar-menu>' })
class WrapperStubComponent {
  menu: Menu = menu;
}

describe('First Level Menu', () => {
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
      imports: [RouterTestingModule.withRoutes(routes)],
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

  it('should create 4 menu items', () => {
    expect(debugElement.queryAll(By.css(cssSelectors.items)).length).toEqual(menu.length);
  });

  it('should have root menu item activated on init', () => {
    expect(debugElement.queryAll(By.css(cssSelectors.activatedItems)).length).toEqual(1);
    expect(debugElement.query(By.css(cssSelectors.activatedItemsLabels))).toHaveText(menu[0].label);
  });

  it('should activate second menu item on navigation', fakeAsync(() => {
    navigateTo(router, (menu[1] as MenuItemLeafRoute).route);

    expect(debugElement.queryAll(By.css(cssSelectors.activatedItems)).length).toEqual(1);
    expect(debugElement.query(By.css(cssSelectors.activatedItemsLabels))).toHaveText(menu[1].label);
  }));

  it('should navigate to item route on menu item click', fakeAsync(() => {
    clickElement(debugElement, menu[2].label);

    expect(debugElement.queryAll(By.css(cssSelectors.activatedItems)).length).toEqual(1);
    expect(debugElement.query(By.css(cssSelectors.activatedItemsLabels))).toHaveText(menu[2].label);
    expect(router.url).toEqual((menu[2] as MenuItemLeafRoute).route);
  }));

  it('should have one element with icon and two icon classes', () => {
    const elements = debugElement.queryAll(By.css(cssSelectors.icon));

    expect(elements.length).toEqual(1);
    expect(elements[0]).toHaveClasses(menu[2].iconClasses);
  });

  it('should have one element with two badges', () => {
    const badgesConf = menu[1].badges as MenuItemBadge[];
    const elements = debugElement.queryAll(By.css(cssSelectors.badges));
    const badges = elements[0].queryAll(By.css(cssSelectors.badge));

    expect(elements.length).toEqual(1);
    expect(badges.length).toEqual(2);
    expect(badges[0]).toHaveText(badgesConf[0].label);
    expect(badges[1]).toHaveText(badgesConf[1].label);
    expect(badges[0]).toHaveClasses(badgesConf[0].classes);
    expect(badges[1]).toHaveClasses(badgesConf[1].classes);
  });

  it('should create 1 header', () => {
    const elements = debugElement.queryAll(By.css(cssSelectors.header));

    expect(elements.length).toEqual(1);
    expect(elements[0]).toHaveText(menu[3].header);
  });
});

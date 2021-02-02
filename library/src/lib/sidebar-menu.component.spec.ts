import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Route, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SidebarMenuComponent } from './sidebar-menu.component';
import { Menu, MenuItemLeafRoute } from './sidebar-menu.interface';

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
  },
  {
    route: '/third',
    label: 'Third',
    iconClasses: 'test-icon icon',
  },
];

@Component({ template: '<mk-angular-sidebar-menu [menu]="menu"></mk-angular-sidebar-menu>' })
class WrapperStubComponent {
  menu: Menu = menu;
}

describe('SidebarMenuComponent', () => {
  let hostComponent: WrapperStubComponent;
  let hostFixture: ComponentFixture<WrapperStubComponent>;
  let debugElement: DebugElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrapperStubComponent, SidebarMenuComponent],
      imports: [RouterTestingModule.withRoutes(routes)],
    }).compileComponents();
  });

  beforeEach(fakeAsync(() => {
    hostFixture = TestBed.createComponent(WrapperStubComponent);
    hostComponent = hostFixture.componentInstance;
    router = TestBed.get(Router);
    debugElement = hostFixture.debugElement.query(By.directive(SidebarMenuComponent));

    router.initialNavigation();
    hostFixture.detectChanges();
    tick();
  }));

  it('should create 3 menu items', () => {
    expect(getMenuElements(debugElement).length).toEqual(3);
  });

  it('should have root menu item activated on init', () => {
    expect(countActivatedElements(debugElement)).toEqual(1);
    expect(getActivatedElementLabel(debugElement)).toEqual(menu[0].label);
  });

  it('should activate second menu item on navigation', fakeAsync(() => {
    navigateTo(router, (menu[1] as MenuItemLeafRoute).route);

    expect(countActivatedElements(debugElement)).toEqual(1);
    expect(getActivatedElementLabel(debugElement)).toEqual(menu[1].label);
  }));

  it('should navigate to item route on menu item click', fakeAsync(() => {
    clickElement(debugElement, 2);

    expect(countActivatedElements(debugElement)).toEqual(1);
    expect(getActivatedElementLabel(debugElement)).toEqual(menu[2].label);
    expect(isUrlEqualRoute(router, 2)).toBeTruthy();
  }));

  it('should have one item with two icon classes', fakeAsync(() => {
    const items = getElementsWithIconClasses(debugElement);
    const iconClasses: string[] = (menu[2] as any).iconClasses.split(' ');

    expect(items.length).toEqual(1);
    iconClasses.forEach((iconClass) => {
      expect(items[0].nativeElement).toHaveClass(iconClass);
    });
  }));
});

const navigateTo = (router: Router, route: string): void => {
  router.navigateByUrl(route);
  tick();
};

const getMenuElements = (debugElement: DebugElement): DebugElement[] => {
  return debugElement.queryAll(By.css('a'));
};

const getActivatedElement = (debugElement: DebugElement): DebugElement => {
  return debugElement.query(By.css('.mk-menu-item-active'));
};

const getActivatedElementLabel = (debugElement: DebugElement): string => {
  return getActivatedElement(debugElement).nativeElement.textContent;
};

const getElementsWithIconClasses = (debugElement: DebugElement): DebugElement[] => {
  return debugElement.queryAll(By.css('.mk-menu-item-icon'));
};

const countActivatedElements = (debugElement: DebugElement): number => {
  return debugElement.queryAll(By.css('.mk-menu-item-active')).length;
};

const clickElement = (childDebugElement: DebugElement, itemIndex: number): void => {
  const elements = childDebugElement.queryAll(By.css('a'));
  elements[itemIndex].triggerEventHandler('click', { button: 0 });
  tick();
};

const isUrlEqualRoute = (router: Router, menuItemIndex: number): boolean => {
  return router.url === (menu[menuItemIndex] as MenuItemLeafRoute).route;
};

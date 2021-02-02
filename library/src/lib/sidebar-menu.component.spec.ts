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
    router = TestBed.inject(Router);
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

  it('should have one element with icon and two icon classes', () => {
    const elements = getElementsWithIconClasses(debugElement);
    const iconClasses: string[] = (menu[2] as any).iconClasses.split(' ');

    expect(elements.length).toEqual(1);

    // @ts-ignore
    expectElementToHaveClasses(elements[0], menu[2].iconClasses);
  });

  it('should have one element with two badges', () => {
    const badgesConf = menu[1].badges;
    const elements = getElementsWithBadges(debugElement);
    const badges = getBadgeElements(elements[0]);

    expect(elements.length).toEqual(1);
    expect(badges.length).toEqual(2);
    // @ts-ignore
    expect(badges[0].nativeElement.textContent).toEqual(badgesConf[0].label);
    // @ts-ignore
    expect(badges[1].nativeElement.textContent).toEqual(badgesConf[1].label);
    // @ts-ignore
    expectElementToHaveClasses(badges[0], badgesConf[0].classes);
    // @ts-ignore
    expectElementToHaveClasses(badges[1], badgesConf[1].classes);
  });
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
  return getActivatedElement(debugElement).query(By.css('.mk-menu-label')).nativeElement.textContent;
};

const getElementsWithIconClasses = (debugElement: DebugElement): DebugElement[] => {
  return debugElement.queryAll(By.css('.mk-menu-item-icon'));
};

const getElementsWithBadges = (debugElement: DebugElement): DebugElement[] => {
  return debugElement.queryAll(By.css('.mk-menu-badges'));
};

const getBadgeElements = (debugElement: DebugElement): DebugElement[] => {
  return debugElement.queryAll(By.css('.mk-menu-badge'));
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

const expectElementToHaveClasses = (element: DebugElement, classes: string) => {
  const classesAr = classes.split(' ');

  classesAr.forEach((cl) => {
    expect(element.nativeElement).toHaveClass(cl);
  });
};

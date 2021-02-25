import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { MenuHarness } from '../testing/menu.harness';

import { Menu } from '../sidebar-menu.interface';

import { customMatchers } from './custom.matchers.spec';
import { sharedTestingModuleFactory, WrapperStubComponent } from './shared.spec';
import { menuItemsCount } from './utils.spec';

enum Roles {
  ADMIN,
  EDITOR,
  AUTHOR,
}

const menu: Menu = [
  {
    route: '',
    label: 'home',
  },
  {
    route: '/second',
    label: 'Second',
    roles: [Roles.ADMIN],
  },
  {
    route: '/third',
    label: 'Third',
    roles: [Roles.ADMIN, Roles.AUTHOR],
  },
  {
    route: '/third',
    label: 'Third',
    roles: [],
  },
  {
    label: 'Fourth',
    roles: [Roles.AUTHOR],
    children: [
      {
        route: '/fourth-child',
        label: 'Fourth child',
      },
    ],
  },
  {
    label: 'fifth',
    children: [
      {
        route: '/fifth-child',
        label: 'Fifth child',
        roles: [Roles.EDITOR],
      },
    ],
  },
];

describe('first level', () => {
  let harness: MenuHarness;
  let router: Router;
  let fixture: ComponentFixture<WrapperStubComponent>;

  beforeEach(async () => {
    jasmine.addMatchers(customMatchers);

    await TestBed.configureTestingModule(sharedTestingModuleFactory()).compileComponents();

    fixture = TestBed.createComponent(WrapperStubComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);
    harness = await loader.getHarness(MenuHarness);
    router = TestBed.inject(Router);

    fixture.componentInstance.menu = menu;
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create menu items', async () => {
    const items = await harness.getItems();
    expect(items.length).toEqual(menuItemsCount(menu));
  });

  it('should create menu items for author', async () => {
    fixture.componentInstance.role = Roles.AUTHOR;
    fixture.detectChanges();

    const items = await harness.getItems();
    expect(items.length).toEqual(6);
  });

  it('should create menu items for editor', async () => {
    fixture.componentInstance.role = Roles.EDITOR;
    fixture.detectChanges();

    const items = await harness.getItems();
    expect(items.length).toEqual(4);
  });

  it('should create menu items and disable unauthorized items', async () => {
    fixture.componentInstance.role = Roles.EDITOR;
    fixture.detectChanges();

    let items = await harness.getItems();
    expect(items.length).toEqual(4);

    fixture.componentInstance.unAuthorizedVisibility = 'disabled';
    fixture.detectChanges();

    items = await harness.getItems();
    expect(items.length).toEqual(8);

    const disabledItems = await harness.getDisabledItems();
    expect(disabledItems.length).toEqual(3);
  });

  it('should switch hidden items on role change', async () => {
    fixture.componentInstance.role = Roles.EDITOR;
    fixture.detectChanges();

    let items = await harness.getItems();
    expect(items.length).toEqual(4);

    fixture.componentInstance.role = Roles.ADMIN;
    fixture.detectChanges();

    items = await harness.getItems();
    expect(items.length).toEqual(8);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { MenuHarness } from '../../../testing/src/menu.harness';

import { Menu } from '../sidebar-menu.interface';

import { customMatchers } from './custom.matchers.spec';
import { sharedTestingModuleFactory, WrapperStubComponent } from './shared.spec';
import { menuItemsCount } from './utils.spec';

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
        ],
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

    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should not create menu items', async () => {
    expect((await harness.getItems()).length).toEqual(0);
  });

  it('should create menu and set opened items', async () => {
    await router.navigateByUrl(menu[1].children?.[1].children?.[0].route as string);
    fixture.componentInstance.menu = menu;
    await fixture.detectChanges();

    expect((await harness.getItems()).length).toEqual(menuItemsCount(menu));
    expect((await harness.getOpenedNodesLabels()).length).toEqual(2);
  });
});

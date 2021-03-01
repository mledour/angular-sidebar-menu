import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { MenuHarness } from '../../../testing/src/menu.harness';

import { Menu } from '../sidebar-menu.interface';

import { customMatchers } from './custom.matchers.spec';
import {
  sharedTestingModuleFactory,
  WrapperStubComponent,
  WrapperStubComponent as WrapperStubComponent2,
} from './shared.spec';
import { menuItemsCount } from './utils.spec';

const menu: Menu = [
  {
    route: '',
    label: 'home',
  },
  {
    label: 'Second',
    children: [
      {
        label: 'Second child 1',
        route: '/second-child-1',
      },
    ],
  },
  {
    label: 'Third',
    children: [
      {
        label: 'Third child 1',
        route: '/thirst-child-1',
      },
      {
        label: 'Third child 2',
        children: [
          {
            label: 'Third child 2 child 1',
            route: '/thirst-child-2-child-1',
          },
        ],
      },
    ],
  },
];

describe('multiple instances', () => {
  let harness1: MenuHarness;
  let harness2: MenuHarness;
  let router: Router;

  beforeEach(async () => {
    jasmine.addMatchers(customMatchers);
    const testingModule = sharedTestingModuleFactory();
    testingModule.declarations?.push(WrapperStubComponent2);

    await TestBed.configureTestingModule(testingModule).compileComponents();

    const fixtureMenu1 = TestBed.createComponent(WrapperStubComponent);
    const fixtureMenu2 = TestBed.createComponent(WrapperStubComponent2);
    const loader1 = TestbedHarnessEnvironment.loader(fixtureMenu1);
    const loader2 = TestbedHarnessEnvironment.loader(fixtureMenu2);
    harness1 = await loader1.getHarness(MenuHarness);
    harness2 = await loader2.getHarness(MenuHarness);
    router = TestBed.inject(Router);

    fixtureMenu1.componentInstance.menu = menu;
    fixtureMenu2.componentInstance.menu = menu;
    router.initialNavigation();
    fixtureMenu1.detectChanges();
    fixtureMenu2.detectChanges();
  });

  it('should create 2 menus instances', async () => {
    expect((await harness1.getItems()).length).toEqual(menuItemsCount(menu));
    expect((await harness2.getItems()).length).toEqual(menuItemsCount(menu));
  });

  it('should open nodes on current instance only', async () => {
    expect((await harness1.getOpenedNodes()).length).toEqual(0);
    expect((await harness2.getOpenedNodes()).length).toEqual(0);

    await harness1.clickItemWith({ label: menu[1].label });

    expect((await harness1.getOpenedNodes()).length).toEqual(1);
    expect((await harness2.getOpenedNodes()).length).toEqual(0);

    await harness2.clickItemWith({ label: menu[1].label });
    await harness2.clickItemWith({ label: menu[2].children?.[1].label });

    expect((await harness1.getOpenedNodes()).length).toEqual(1);
    expect((await harness2.getOpenedNodes()).length).toEqual(2);
  });

  it('should set anchor active on both menu instances when navigating', async () => {
    await router.navigateByUrl(menu[2].children?.[0].route as string);
    expect((await harness1.getOpenedNodes()).length).toEqual(1);
    expect((await harness2.getOpenedNodes()).length).toEqual(1);

    const menu1ActivatedLabels = await harness1.getActivatedAnchorsLabels();
    expect(menu1ActivatedLabels.length).toEqual(2);
    expect(await menu1ActivatedLabels[0].text()).toEqual(menu[2].label as string);
    expect(await menu1ActivatedLabels[1].text()).toEqual(menu[2].children?.[0].label as string);

    const menu2ActivatedLabels = await harness2.getActivatedAnchorsLabels();
    expect(menu2ActivatedLabels.length).toEqual(2);
    expect(await menu2ActivatedLabels[0].text()).toEqual(menu[2].label as string);
    expect(await menu2ActivatedLabels[1].text()).toEqual(menu[2].children?.[0].label as string);
  });
});

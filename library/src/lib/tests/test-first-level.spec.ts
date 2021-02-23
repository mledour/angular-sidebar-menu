import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { MenuHarness } from '../testing/menu.harness';

import { Menu, MenuItemBadge, MenuItemHeader, MenuItemLeafRoute } from '../sidebar-menu.interface';

import { customMatchers } from './custom.matchers.spec';
import { sharedTestingModuleFactory, WrapperStubComponent } from './shared.spec';

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

describe('first level', () => {
  let harness: MenuHarness;
  let router: Router;

  beforeEach(async () => {
    jasmine.addMatchers(customMatchers);

    await TestBed.configureTestingModule(sharedTestingModuleFactory()).compileComponents();

    const fixture = TestBed.createComponent(WrapperStubComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);
    harness = await loader.getHarness(MenuHarness);
    router = TestBed.inject(Router);

    fixture.componentInstance.menu = menu;
    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create 4 menu items', async () => {
    const items = await harness.getItems();
    expect(items.length).toEqual(menu.length);
  });

  it('should have root menu item activated on init', async () => {
    const items = await harness.getActivatedAnchors();
    expect(items.length).toEqual(1);

    const label = await items[0].text();
    expect(label).toEqual(menu[0].label as string);
  });

  it('should activate second menu item on navigation', async () => {
    const itemConf = menu[1] as MenuItemLeafRoute;
    await router.navigateByUrl(itemConf.route);

    const items = await harness.getActivatedAnchors();
    expect(items.length).toEqual(1);

    const label = await harness.getActivatedAnchorsLabels();
    expect(label.length).toEqual(1);
    expect(await label[0].text()).toEqual(itemConf.label);
  });

  it('should navigate to item route on menu item click', async () => {
    const itemConf = menu[2] as MenuItemLeafRoute;
    const item = await harness.getItemsWith({ label: itemConf.label });
    const link = await item[0].getAnchorElement();

    await link.click();

    const items = await harness.getActivatedAnchors();
    expect(items.length).toEqual(1);

    const label = await harness.getActivatedAnchorsLabels();
    expect(label.length).toEqual(1);
    expect(await label[0].text()).toEqual(itemConf.label);

    expect(router.url).toEqual(itemConf.route);
  });

  it('should have one element with icon and two icon classes', async () => {
    const itemConf = menu[2] as MenuItemLeafRoute;
    const elements = await harness.getItemsWithIcons();

    expect(elements.length).toEqual(1);
    expect(elements[0]).toHaveClasses(itemConf.iconClasses);
  });

  it('should have one element with two badges', async () => {
    const itemConf = menu[1] as MenuItemLeafRoute;
    const badgesConf = menu[1].badges as MenuItemBadge[];
    const elements = await harness.getItemsWith({ label: itemConf.label });
    const badges = await elements[0].getBadgesElement();

    expect(elements.length).toEqual(1);

    expect(badges.length).toEqual(2);
    expect(await badges[0].text()).toEqual(badgesConf[0].label);
    expect(await badges[1].text()).toEqual(badgesConf[1].label);
    expect(badges[0]).toHaveClasses(badgesConf[0].classes);
    expect(badges[1]).toHaveClasses(badgesConf[1].classes);
  });

  it('should create 1 header', async () => {
    const itemConf = menu[3] as MenuItemHeader;
    const elements = await harness.getItemsHeaders();

    expect(elements.length).toEqual(1);
    expect(await elements[0].text()).toEqual(itemConf.header);
  });
});

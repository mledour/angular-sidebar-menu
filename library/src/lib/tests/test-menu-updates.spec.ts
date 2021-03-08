import { Menu } from '../sidebar-menu.interface';

import { beforeEachData, beforeEachFactory } from './shared.spec';
import { menuItemsCount } from './utils.spec';

const menu: Menu = [
  {
    id: 'home',
    route: '',
    label: 'home',
  },
  {
    id: 'node-1',
    label: 'node 1',
    children: [
      {
        id: 'node-1-1',
        label: 'node 1 children 1',
        route: '/node-1-children-1',
      },
      {
        id: 'node-1-2',
        label: 'node 1 children 2',
        children: [
          {
            id: 'node-1-2-1',
            label: 'node 2 children 1',
            route: '/node-2-children-1',
          },
        ],
      },
    ],
  },
];

describe('first level', () => {
  let { harness, fixture, router } = beforeEachData;

  beforeEach(async () => {
    ({ harness, fixture, router } = await beforeEachFactory());
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

  it('should keep node toggle state on menu change', async () => {
    fixture.componentInstance.menu = menu;
    await fixture.detectChanges();

    await harness.clickItemWith({ label: menu[1].label });
    await harness.clickItemWith({ label: menu[1].children?.[1].label });

    expect((await harness.getOpenedNodesLabels()).length).toEqual(2);

    fixture.componentInstance.menu = JSON.parse(JSON.stringify(menu));
    await fixture.detectChanges();

    expect((await harness.getOpenedNodesLabels()).length).toEqual(2);
  });
});

import { Menu } from '../sidebar-menu.interface';

import { beforeEachData, beforeEachFactory } from './shared.spec';
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

describe('nth levels', () => {
  let { harness, router } = beforeEachData;

  beforeEach(async () => {
    ({ harness, router } = await beforeEachFactory(menu));
  });

  it('should create 4 menu items', async () => {
    expect((await harness.getItems()).length).toEqual(menuItemsCount(menu));
  });

  it('should click third level item and navigate', async () => {
    expect((await harness.getActivatedAnchors()).length).toEqual(1);

    // Open first level node
    await harness.clickItemWith({ label: menu[1].label });
    expect((await harness.getOpenedNodes()).length).toEqual(1);
    expect(await (await harness.getOpenedNodesLabels())[0].text()).toEqual(menu[1].label as string);
    expect(router.url).toEqual('/');

    // Open second level node
    await harness.clickItemWith({ label: menu[1].children?.[1].label });
    expect((await harness.getOpenedNodes()).length).toEqual(2);
    expect(await (await harness.getOpenedNodesLabels())[1].text()).toEqual(menu[1].children?.[1].label as string);
    expect(router.url).toEqual('/');

    // Click third level item
    await harness.clickItemWith({ label: menu[1].children?.[1].children?.[0].label });
    expect((await harness.getOpenedNodes()).length).toEqual(2);
    expect(router.url).toEqual(menu[1].children?.[1].children?.[0].route as string);

    // Test if all ancestors are active
    let itemsActive = await harness.getActivatedAnchorsLabels();
    expect(itemsActive.length).toEqual(3);
    expect(await itemsActive[0].text()).toEqual(menu[1].label as string);
    expect(await itemsActive[1].text()).toEqual(menu[1].children?.[1].label as string);
    expect(await itemsActive[2].text()).toEqual(menu[1].children?.[1].children?.[0].label as string);

    // Go back to first menu item to check others are collapsed and deactivated
    await harness.clickItemWith({ label: menu[0].label });
    itemsActive = await harness.getActivatedAnchorsLabels();
    expect(router.url).toEqual('/');
    expect(itemsActive.length).toEqual(1);
    expect(await itemsActive[0].text()).toEqual(menu[0].label as string);
    expect((await harness.getOpenedNodes()).length).toEqual(0);
  });

  it('should close other items on item click', async () => {
    await harness.clickItemWith({ label: menu[1].label });
    await harness.clickItemWith({ label: menu[1].children?.[1].label });

    expect((await harness.getOpenedNodes()).length).toEqual(2);

    await harness.clickItemWith({ label: menu[1].children?.[3].label });
    expect((await harness.getOpenedNodes()).length).toEqual(2);
  });

  it('should toggle item', async () => {
    await harness.clickItemWith({ label: menu[1].label });
    await harness.clickItemWith({ label: menu[1].children?.[1].label });

    expect((await harness.getOpenedNodes()).length).toEqual(2);

    await harness.clickItemWith({ label: menu[1].children?.[1].label });
    expect((await harness.getOpenedNodes()).length).toEqual(1);
  });
});

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
        header: 'header 1',
      },
      {
        header: 'header 2',
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

describe('filter', () => {
  let { harness, fixture } = beforeEachData;

  beforeEach(async () => {
    ({ harness, fixture } = await beforeEachFactory(menu));
  });

  it('should create menu items', async () => {
    expect((await harness.getItems()).length).toEqual(menuItemsCount(menu));
  });

  it('should not filter items', async () => {
    expect((await harness.getFilteredItems()).length).toEqual(0);

    fixture.componentInstance.search = '';

    expect((await harness.getFilteredItems()).length).toEqual(0);
  });

  it('should filter items', async () => {
    fixture.componentInstance.search = 'node 1';
    expect((await harness.getFilteredItems()).length).toEqual(12);
  });

  it('should not filter item node parents', async () => {
    fixture.componentInstance.search = 'node 2 children 41';

    expect((await harness.getFilteredItems()).length).toEqual(12);
    expect(await (await harness.getItemWith({ label: 'node 2 children 41' })).isFiltered()).toBeFalsy();
    expect(await (await harness.getItemWith({ label: 'node 1 children 4' })).isFiltered()).toBeFalsy();
    expect(await (await harness.getItemWith({ label: 'node 1' })).isFiltered()).toBeFalsy();
    expect(await (await harness.getItemWith({ label: 'node 1 children 1' })).isFiltered()).toBeTruthy();
  });

  it('should not filter header item', async () => {
    fixture.componentInstance.search = 'header 1';
    expect(await (await harness.getItemWith({ label: 'header 1' })).isFiltered()).toBeFalsy();
    expect(await (await harness.getItemWith({ label: 'header 2' })).isFiltered()).toBeTruthy();

    fixture.componentInstance.search = 'header';
    expect(await (await harness.getItemWith({ label: 'header 1' })).isFiltered()).toBeFalsy();
    expect(await (await harness.getItemWith({ label: 'header 2' })).isFiltered()).toBeFalsy();
  });
});

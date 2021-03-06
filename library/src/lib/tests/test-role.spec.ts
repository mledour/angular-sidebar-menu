import { Menu } from '../sidebar-menu.interface';

import { beforeEachData, beforeEachFactory } from './shared.spec';
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
    route: '/fourth',
    label: 'Fourth',
    roles: [],
  },
  {
    label: 'Fifth',
    roles: [Roles.AUTHOR],
    children: [
      {
        route: '/fifth-child',
        label: 'Fifth child',
      },
    ],
  },
  {
    label: 'Sixth',
    children: [
      {
        route: '/Sixth-child',
        label: 'Sixth child',
        roles: [Roles.EDITOR],
      },
    ],
  },
];

describe('first level', () => {
  let { harness, fixture } = beforeEachData;

  beforeEach(async () => {
    ({ harness, fixture } = await beforeEachFactory(menu));
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
    expect(disabledItems.length).toEqual(4);
  });

  it('should switch hidden items on role change', async () => {
    fixture.componentInstance.role = Roles.EDITOR;
    fixture.detectChanges();

    let items = await harness.getItems();
    expect(items.length).toEqual(4);

    fixture.componentInstance.role = Roles.ADMIN;
    fixture.detectChanges();

    items = await harness.getItems();
    expect(items.length).toEqual(5);
  });
});

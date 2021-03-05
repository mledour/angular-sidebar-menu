import { Menu, MenuItemBadge, MenuItemHeader, MenuItemLeafRoute } from '../sidebar-menu.interface';
import { beforeEachData, beforeEachFactory } from './shared.spec';

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
  let { harness, router } = beforeEachData;

  beforeEach(async () => {
    ({ harness, router } = await beforeEachFactory(menu));
  });

  it('should create 4 menu items', async () => {
    expect((await harness.getItems()).length).toEqual(menu.length);
  });

  it('should have root menu item activated on init', async () => {
    const items = await harness.getActivatedAnchors();
    expect((await harness.getActivatedAnchors()).length).toEqual(1);

    const label = await items[0].text();
    expect(label).toEqual(menu[0].label as string);
  });

  it('should activate second menu item on navigation', async () => {
    const itemConf = menu[1] as MenuItemLeafRoute;
    await router.navigateByUrl(itemConf.route);

    expect((await harness.getActivatedAnchors()).length).toEqual(1);

    const label = await harness.getActivatedAnchorsLabels();
    expect(label.length).toEqual(1);
    expect(await label[0].text()).toEqual(itemConf.label);
  });

  it('should navigate to item route on menu item click', async () => {
    const itemConf = menu[2] as MenuItemLeafRoute;
    const item = await harness.getItemsWith({ label: itemConf.label });
    const link = await item[0].getAnchorElement();

    await link.click();

    expect((await harness.getActivatedAnchors()).length).toEqual(1);

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

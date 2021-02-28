import { Menu, MenuItem } from '../sidebar-menu.interface';

export const menuItemsCount = (menu: Menu, acc = 0): number => {
  return menu.reduce((rAcc: number, rMenu: MenuItem, val: number): number => {
    if (rMenu.children) {
      return menuItemsCount(rMenu.children, rAcc) + 1;
    }

    return rAcc + 1;
  }, acc);
};

export interface MenuItem {
  label: string;
  iconClasses?: string;
}

export interface MenuItemLeafRoute extends MenuItem {
  route: string;
}

interface MenuItemLeafURL extends MenuItem {
  url: string;
  target?: string;
}

export type MenuItemLeaf = MenuItemLeafRoute | MenuItemLeafURL;

export type Menu = MenuItemLeaf[];

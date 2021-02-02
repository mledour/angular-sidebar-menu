export interface MenuItem {
  label: string;
  iconClasses?: string;
}

export interface MenuItemBadge {
  label: string;
  classes: string;
}

export interface MenuItemBadges {
  badges?: MenuItemBadge[];
}

export interface MenuItemLeafRoute extends MenuItem, MenuItemBadges {
  route: string;
}

interface MenuItemLeafURL extends MenuItem, MenuItemBadges {
  url: string;
  target?: string;
}

export type MenuItemLeaf = MenuItemLeafRoute | MenuItemLeafURL;

export type Menu = MenuItemLeaf[];

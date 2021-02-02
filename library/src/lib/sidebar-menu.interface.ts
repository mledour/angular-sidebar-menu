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

interface MenuItemSeparator {
  label: string;
  separator: boolean;
}

export type MenuItemLeaf = MenuItemLeafRoute | MenuItemLeafURL | MenuItemSeparator;

export type Menu = MenuItemLeaf[];

export interface MenuItemBadge {
  label: string;
  classes: string;
}

export interface MenuItemBase {
  label: string;
  iconClasses?: string;
  badges?: MenuItemBadge[];
}

export interface MenuItemLeafRoute extends MenuItemBase {
  route: string;
  linkActiveExact?: boolean;
}

export interface MenuItemLeafURL extends MenuItemBase {
  url: string;
  target?: string;
}

export interface MenuItemHeader {
  header: string;
}

export interface MenuItemNode extends MenuItemBase {
  children: MenuItem[];
}

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

export type MenuItem = XOR<MenuItemLeafRoute, XOR<MenuItemLeafURL, XOR<MenuItemHeader, MenuItemNode>>>;

export type Menu = MenuItem[];

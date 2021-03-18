import { Role } from './internal/role.service';

export type UnAuthorizedVisibility = 'hidden' | 'disabled';

export enum Modes {
  EXPANDED = 'expanded',
  EXPANDABLE = 'expandable',
  MINI = 'mini',
}

type MenuItemID = number | string;

export interface MenuItemBadge {
  label: string;
  classes: string;
}

export interface MenuItemBase {
  id?: MenuItemID;
  label: string;
  iconClasses?: string;
  badges?: MenuItemBadge[];
  roles?: Role[];
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
  id?: MenuItemID;
  header: string;
}

export interface MenuItemNode extends MenuItemBase {
  children: MenuItem[];
}

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

export type MenuItem = XOR<MenuItemLeafRoute, XOR<MenuItemLeafURL, XOR<MenuItemHeader, MenuItemNode>>>;

export type Menu = MenuItem[];

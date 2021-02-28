import { Menu } from 'angular-sidebar-menu';
import { Roles } from './roles.enum';

export const menu: Menu = [
  {
    header: 'Documentation',
  },
  {
    label: 'Get Started',
    route: '/',
    iconClasses: 'fa fa-rocket',
  },
  {
    label: 'Configuration',
    route: '/configuration',
    iconClasses: 'fa fa-cog',
  },
  {
    label: 'Menu Definition',
    route: '/menu-definition',
    iconClasses: 'fa fa-cube',
  },
  {
    header: 'Demo',
  },
  {
    label: 'Multilevel',
    iconClasses: 'fa fa-share',
    roles: [],
    children: [
      {
        label: 'Level One',
        route: '/level-one',
        badges: [
          {
            label: '1',
            classes: 'badge--red',
          },
        ],
      },
      {
        label: 'Level One',
        children: [
          {
            label: 'Level Two',
            children: [
              {
                label: 'Level Three',
                route: '/level-three-1',
              },
              {
                label: 'Level Three',
                route: '/level-three-2',
              },
              {
                label: 'Level Three',
                route: '/level-three-3',
              },
            ],
          },
          {
            label: 'Level Two',
            children: [
              {
                label: 'Level Three',
                route: '/level-three-2-1',
              },
              {
                label: 'Level Three',
                route: '/level-three-2-2',
              },
              {
                label: 'Level Three',
                route: '/level-three-2-3',
              },
            ],
          },
          {
            label: 'Level Two',
            route: '/level-two-1',
          },
          {
            label: 'Level Two',
            route: '/level-two-2',
          },
        ],
      },
      {
        header: 'Level One Header',
      },
      {
        label: 'Level One',
        route: '/level-one-2',
      },
    ],
  },
  {
    label: 'Route With Parameter',
    iconClasses: 'fa fa-sliders',
    children: [
      {
        label: 'Route ID',
        children: [
          {
            label: 'Sub Route ID One',
            route: '/route-id/route-id-two/1',
          },
        ],
      },
      {
        label: 'Route ID One',
        route: '/route-id-one/1',
      },
      {
        label: 'Route ID Two',
        route: '/route-id-one/2',
      },
      {
        label: 'Route ID Three',
        route: '/route-id-one/3',
      },
    ],
  },
  {
    label: 'Admin',
    iconClasses: 'fa fa-user-plus',
    route: 'admin',
    roles: [Roles.ADMIN],
    badges: [
      {
        label: 'admin',
        classes: 'badge--red',
      },
    ],
  },
  {
    label: 'Roles',
    iconClasses: 'fa fa-lock',
    children: [
      {
        label: 'Admin & Editor',
        route: '/roles/admin-editor',
        roles: [Roles.ADMIN, Roles.EDITOR],
      },
      {
        label: 'Admin',
        route: '/roles/admin',
        roles: [Roles.ADMIN],
      },
      {
        label: 'Editor',
        route: '/roles/editor',
        roles: [Roles.EDITOR],
      },
    ],
  },
  {
    label: 'Child Routes',
    iconClasses: 'fa fa-level-down',
    route: 'child-routes',
    linkActiveExact: false,
  },
  {
    label: 'Badges',
    iconClasses: 'fa fa-star',
    route: 'badges',
    badges: [
      {
        label: 'new',
        classes: 'badge--red',
      },
      {
        label: '1',
        classes: 'badge--blue',
      },
    ],
  },
  {
    label: 'External Link',
    iconClasses: 'fa fa-external-link',
    url: '//google.com',
  },
];

import { Menu } from 'angular-sidebar-menu';

export const menu: Menu = [
  {
    header: 'Documentation',
  },
  {
    label: 'Get Started',
    route: '',
    iconClasses: 'fa fa-rocket',
  },
  {
    label: 'Configuration',
    route: 'configuration',
    iconClasses: 'fa fa-cog',
  },
  {
    label: 'Menu Definition',
    route: 'menu-definition',
    iconClasses: 'fa fa-cube',
  },
  {
    header: 'Demo',
  },
  {
    label: 'Multilevel',
    iconClasses: 'fa fa-share',
    children: [
      {
        label: 'Level One',
        route: 'level-one',
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
                url: '//google.com',
              },
              {
                label: 'Level Three',
                url: '//google.com',
              },
              {
                label: 'Level Three',
                url: '//google.com',
              },
            ],
          },
          {
            label: 'Level Two',
            children: [
              {
                label: 'Level Three',
                route: 'level-three-1',
              },
              {
                label: 'Level Three',
                route: 'level-three-2',
              },
              {
                label: 'Level Three',
                url: '//google.com',
              },
            ],
          },
          {
            label: 'Level Two',
            route: 'configuration',
          },
          {
            label: 'Level Two',
            route: 'configuration-2',
          },
        ],
      },
      {
        header: 'Level One Header',
      },
      {
        label: 'Level One',
        route: 'level-one-2',
      },
    ],
  },
  {
    label: 'External Link',
    iconClasses: 'fa fa-external-link',
    url: '//google.com',
  },
  {
    label: 'Badges',
    iconClasses: 'fa fa-star',
    url: '//google.com',
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
];

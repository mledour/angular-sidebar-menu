import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-definition',
  templateUrl: './menu-definition.component.html',
  styleUrls: ['./menu-definition.component.css'],
})
export class MenuDefinitionComponent {
  readonly menuType = 'Menu: (MenuItemLeafRoute | MenuItemLeafURL | MenuItemHeader | MenuItemNode)[]';

  readonly menuItemLeafRouteType = `label: string;
iconClasses?: string;
badges?: MenuItemBadge[];
roles: Role[];
route: string;
linkActiveExact: boolean = true`;

  readonly menuItemLeafURLType = `label: string;
iconClasses?: string;
badges?: MenuItemBadge[];
roles: Role[];
url: string;
target?: string;`;

  readonly menuItemLeafNodeType = `label: string;
iconClasses?: string;
badges?: MenuItemBadge[];
roles: Role[];
children: MenuItem[];`;

  readonly menuConfExample = `const menu = [
  {
    header: 'Documentation',
  },
  {
    label: 'Get Started',
    route: '',
    iconClasses: 'fa fa-rocket',
  },
  {
    label: 'Multilevel',
    iconClasses: 'fa fa-share',
    roles: ['ADMIN', 'EDITOR']
    children: [
      {
        label: 'Configuration 1',
        url: '//google.com',
        badges: [
          {
            label: '1',
            classes: 'badge--red',
          },
        ],
      },
      {
        header: 'Separator',
      },
      {
        label: 'Configuration 2',
        children: [
          {
            label: 'Configuration 1',
            url: '//google.com',
          },
        ],
      },
    ],
  },
  {
    label: 'Badges',
    iconClasses: 'fa fa-star',
    url: '//google.com',
    badges: [
      {
        label: 'new',
        classes: 'badge--red'
      }, {
        label: '1',
        classes: 'badge--blue'
      },
    ]
  },
]`;
}

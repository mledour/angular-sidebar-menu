import { Component } from '@angular/core';
import { Menu } from 'angular-sidebar-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-sidebar-menu';

  menu: Menu = [
    {
      label: 'Get Started',
      route: '',
      iconClasses: 'fa fa-road',
      badges: [
        {
          label: 'new',
          classes: 'badge--green',
        },
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
      label: 'Configuration',
      iconClasses: 'fa fa-road',
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
            {
              label: 'Configuration 1',
              route: 'configuration',
            },
            {
              label: 'Configuration 1',
              url: '//google.com',
            },
          ],
        },
        {
          label: 'Configuration 3',
          url: '//google.com',
        },
      ],
    },
    {
      label: 'Configuration 2',
      iconClasses: 'fa fa-road',
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
            {
              label: 'Configuration 1',
              route: 'configuration',
            },
            {
              label: 'Configuration 1',
              url: '//google.com',
            },
          ],
        },
        {
          label: 'Configuration 3',
          url: '//google.com',
        },
      ],
    },
    {
      label: 'External',
      url: '//google.com',
      target: '_blank',
    },
  ];
}

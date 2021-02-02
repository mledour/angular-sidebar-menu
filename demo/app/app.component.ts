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
          classes: 'mk-badge-green',
        },
        {
          label: '1',
          classes: 'mk-badge-red',
        },
      ],
    },
    {
      label: 'Configuration',
      route: 'configuration',
    },
    {
      label: 'External',
      url: '//google.com',
      target: '_blank',
    },
  ];
}

import { Component } from '@angular/core';
import { menu } from './menu.conf';
import { Roles } from './roles.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-sidebar-menu';
  menu = menu;
  roles = Roles;

  currentRole = Roles.EDITOR;
}

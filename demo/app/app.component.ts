import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { TranslocoService } from '@ngneat/transloco';
import { MenuConfService } from './menu-conf.service';
import { Roles } from './roles.enum';
import { Modes as SidebarModes } from 'angular-sidebar-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-sidebar-menu';
  roles = Roles;
  currentRole = Roles.EDITOR;
  sidebarModes = SidebarModes;
  currentSidebarMode = SidebarModes.EXPANDED;
  lang = this.translationService.getDefaultLang();
  currentSearch?: string;
  inputSearchFocus = false;
  mainNavigationOpened = true;

  constructor(public menuConfService: MenuConfService, private translationService: TranslocoService) {}

  onLangChange(event: MatSelectChange): void {
    this.translationService.setActiveLang(event.value);
  }
}

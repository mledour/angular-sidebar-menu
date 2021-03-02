import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { TranslocoService } from '@ngneat/transloco';
import { MenuConfService } from './menu-conf.service';
import { Roles } from './roles.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-sidebar-menu';
  roles = Roles;
  currentRole = Roles.EDITOR;
  lang = this.translationService.getDefaultLang();

  constructor(public menuConfService: MenuConfService, private translationService: TranslocoService) {}

  onLangChange(event: MatSelectChange): void {
    this.translationService.setActiveLang(event.value);
  }
}

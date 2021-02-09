import { Component } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
})
export class ConfigurationComponent {
  readonly example =
    '<asm-angular-sidebar-menu [menu]="menu" toggleIconClasses="fa fa-angle-left" iconClasses="fa fa-circle-o"></asm-angular-sidebar-menu>';
}

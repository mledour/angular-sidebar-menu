import { Component } from '@angular/core';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
})
export class GetStartedComponent {
  readonly importLib = `import { NgModule } from '@angular/core';
import { SidebarMenuModule } from 'angular-sidebar-menu';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [],
  imports: [SidebarMenuModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
`;

  readonly callComponent = '<asm-angular-sidebar-menu [menu]="menu"></asm-angular-sidebar-menu>';
}

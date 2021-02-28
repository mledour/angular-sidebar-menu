import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SidebarMenuModule } from 'angular-sidebar-menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { GetStartedComponent } from './pages/get-started/get-started.component';
import { MenuDefinitionComponent } from './pages/menu-definition/menu-definition.component';
import { CodeHighlightComponent } from './code-highlight/code-highlight.component';
import { StubComponentComponent } from './pages/stub-component/stub-component.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigurationComponent,
    GetStartedComponent,
    MenuDefinitionComponent,
    CodeHighlightComponent,
    CodeHighlightComponent,
    StubComponentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    AppRoutingModule,
    SidebarMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

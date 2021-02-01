import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';

import { SidebarMenuModule } from 'angular-sidebar-menu';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, ConfigurationComponent, GetStartedComponent],
  imports: [BrowserModule, MatSidenavModule, AppRoutingModule, SidebarMenuModule, NoopAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

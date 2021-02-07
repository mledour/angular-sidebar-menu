import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SidebarMenuModule } from 'angular-sidebar-menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { GetStartedComponent } from './get-started/get-started.component';

@NgModule({
  declarations: [AppComponent, ConfigurationComponent, GetStartedComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatSidenavModule, AppRoutingModule, SidebarMenuModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { environment } from 'demo/environments/environment';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TRANSLOCO_LOADER, TRANSLOCO_CONFIG, translocoConfig, TranslocoModule } from '@ngneat/transloco';
import { TranslationLoaderService } from './translation-loader.service';

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
    HttpClientModule,
    TranslocoModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    AppRoutingModule,
    SidebarMenuModule,
  ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'fr'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslationLoaderService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

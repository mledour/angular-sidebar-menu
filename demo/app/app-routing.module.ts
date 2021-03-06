import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { GetStartedComponent } from './pages/get-started/get-started.component';
import { MenuDefinitionComponent } from './pages/menu-definition/menu-definition.component';
import { StubComponentComponent } from './pages/stub-component/stub-component.component';

const routes: Routes = [
  {
    path: '',
    component: GetStartedComponent,
  },
  {
    path: 'configuration',
    component: ConfigurationComponent,
  },
  {
    path: 'menu-definition',
    component: MenuDefinitionComponent,
  },
  {
    path: 'menu-definition',
    component: MenuDefinitionComponent,
  },
  {
    path: 'route-id-one/:id',
    component: StubComponentComponent,
  },
  {
    path: 'route-id/route-id-two/:id',
    component: StubComponentComponent,
  },
  {
    path: 'child-routes',
    component: StubComponentComponent,
    children: [
      {
        path: 'child-a',
        component: StubComponentComponent,
      },
      {
        path: 'child-b',
        component: StubComponentComponent,
      },
    ],
  },
  {
    path: '**',
    component: StubComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

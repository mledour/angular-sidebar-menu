import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

import { Menu, UnAuthorizedVisibility } from '../sidebar-menu.interface';
import { SidebarMenuComponent } from '../sidebar-menu.component';
import { MenuItemComponent } from '../menu-item.component';
import { MenuItemNodeComponent } from '../menu-item-node.component';
import { MenuItemAnchorComponent } from '../menu-item-anchor.component';
import { Role } from '../menu-item-role.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentFixture, TestBed, TestModuleMetadata } from '@angular/core/testing';

import { customMatchers } from './custom.matchers.spec';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MenuHarness } from '../../../testing/src/menu.harness';
import { HarnessLoader } from '@angular/cdk/testing';

@Component({})
class RoutedStubComponent {}

export const routes: Route[] = [
  {
    path: '**',
    component: RoutedStubComponent,
  },
];

@Component({
  template:
    '<asm-angular-sidebar-menu [menu]="menu" [role]="role" [search]="search" [unAuthorizedVisibility]="unAuthorizedVisibility"></asm-angular-sidebar-menu>',
})
export class WrapperStubComponent {
  menu?: Menu;
  role?: Role;
  search?: string;
  unAuthorizedVisibility?: UnAuthorizedVisibility = 'hidden';
}

export const sharedTestingModuleFactory = (): TestModuleMetadata => ({
  declarations: [
    WrapperStubComponent,
    SidebarMenuComponent,
    MenuItemComponent,
    MenuItemNodeComponent,
    MenuItemAnchorComponent,
  ],
  imports: [RouterTestingModule.withRoutes(routes), NoopAnimationsModule],
});

type IBeforeEachFactory = {
  harness: MenuHarness;
  router: Router;
  fixture: ComponentFixture<WrapperStubComponent>;
  loader: HarnessLoader;
};

export const beforeEachData: IBeforeEachFactory = {
  harness: undefined as any,
  fixture: undefined as any,
  router: undefined as any,
  loader: undefined as any,
};

export const beforeEachFactory = async (menu?: Menu): Promise<IBeforeEachFactory> => {
  jasmine.addMatchers(customMatchers);

  await TestBed.configureTestingModule(sharedTestingModuleFactory()).compileComponents();

  const fixture = TestBed.createComponent(WrapperStubComponent);
  const loader = TestbedHarnessEnvironment.loader(fixture);
  const harness = await loader.getHarness(MenuHarness);
  const router = TestBed.inject(Router);

  fixture.componentInstance.menu = menu;
  router.initialNavigation();
  fixture.detectChanges();

  return { fixture, loader, harness, router };
};

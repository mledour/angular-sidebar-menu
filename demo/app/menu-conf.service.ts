import { Injectable } from '@angular/core';
import { TranslocoService, translate } from '@ngneat/transloco';
import { Menu } from 'angular-sidebar-menu';
import { BehaviorSubject } from 'rxjs';
import { Roles } from './roles.enum';

@Injectable({ providedIn: 'root' })
export class MenuConfService {
  private menu = new BehaviorSubject<Menu | undefined>(undefined);
  menu$ = this.menu.asObservable();

  constructor(private translationService: TranslocoService) {
    translationService.selectTranslate('').subscribe((e) => this.setMenu());
  }

  private setMenu(): void {
    const menu: Menu = [
      {
        id: 'DOCUMENTATION',
        header: translate<string>('DOCUMENTATION'),
      },
      {
        id: 'GET_STARTED',
        label: translate('GET_STARTED'),
        route: '/',
        iconClasses: 'fa fa-rocket',
      },
      {
        id: 'CONFIGURATION',
        label: this.translationService.translate('CONFIGURATION'),
        route: '/configuration',
        iconClasses: 'fa fa-cog',
      },
      {
        id: 'MENU_DEFINITION',
        label: this.translationService.translate('MENU_DEFINITION'),
        route: '/menu-definition',
        iconClasses: 'fa fa-cube',
      },
      {
        id: 'DEMO',
        header: this.translationService.translate<string>('DEMO'),
      },
      {
        id: 'MULTILEVEL',
        label: this.translationService.translate<string>('MULTILEVEL'),
        iconClasses: 'fa fa-share',
        roles: [],
        children: [
          {
            id: 'LEVEL_ONE-1',
            label: this.translationService.translate('LEVEL_ONE'),
            route: '/level-one',
            badges: [
              {
                label: '1',
                classes: 'badge--red',
              },
            ],
          },
          {
            id: 'LEVEL_ONE-2',
            label: this.translationService.translate<string>('LEVEL_ONE'),
            children: [
              {
                id: 'LEVEL_TWO-1',
                label: this.translationService.translate<string>('LEVEL_TWO'),
                children: [
                  {
                    id: 'LEVEL_THREE-1-1',
                    label: this.translationService.translate('LEVEL_THREE'),
                    route: '/level-three-1',
                  },
                  {
                    id: 'LEVEL_THREE-1-2',
                    label: this.translationService.translate('LEVEL_THREE'),
                    route: '/level-three-2',
                  },
                  {
                    id: 'LEVEL_THREE-1-3',
                    label: this.translationService.translate('LEVEL_THREE'),
                    route: '/level-three-3',
                  },
                ],
              },
              {
                id: 'LEVEL_TWO-2',
                label: this.translationService.translate<string>('LEVEL_TWO'),
                children: [
                  {
                    id: 'LEVEL_THREE-2-1',
                    label: this.translationService.translate('LEVEL_THREE'),
                    route: '/level-three-2-1',
                  },
                  {
                    id: 'LEVEL_THREE-2-2',
                    label: this.translationService.translate('LEVEL_THREE'),
                    route: '/level-three-2-2',
                  },
                  {
                    id: 'LEVEL_THREE-2-3',
                    label: this.translationService.translate('LEVEL_THREE'),
                    route: '/level-three-2-3',
                  },
                ],
              },
              {
                id: 'LEVEL_TWO-3',
                label: this.translationService.translate('LEVEL_TWO'),
                route: '/level-two-1',
              },
              {
                id: 'LEVEL_TWO-4',
                label: this.translationService.translate('LEVEL_TWO'),
                route: '/level-two-2',
              },
            ],
          },
          {
            id: 'LEVEL_ONE-3',
            header: this.translationService.translate<string>('LEVEL_ONE_HEADER'),
          },
          {
            id: 'LEVEL_ONE-4',
            label: this.translationService.translate('LEVEL_ONE'),
            route: '/level-one-2',
          },
        ],
      },
      {
        id: 'ROUTE_WITH_PARAMETERS',
        label: this.translationService.translate<string>('ROUTE_WITH_PARAMETERS'),
        iconClasses: 'fa fa-sliders',
        children: [
          {
            id: 'ROUTE_ID',
            label: this.translationService.translate<string>('ROUTE_ID'),
            children: [
              {
                id: 'ROUTE_ID-SUB_ROUTE_ID_ONE',
                label: this.translationService.translate('SUB_ROUTE_ID_ONE'),
                route: '/route-id/route-id-two/1',
              },
            ],
          },
          {
            id: 'ROUTE_ID_ONE',
            label: this.translationService.translate('ROUTE_ID_ONE'),
            route: '/route-id-one/1',
          },
          {
            id: 'ROUTE_ID_TWO',
            label: this.translationService.translate('ROUTE_ID_TWO'),
            route: '/route-id-one/2',
          },
          {
            id: 'ROUTE_ID_THREE',
            label: this.translationService.translate('ROUTE_ID_THREE'),
            route: '/route-id-one/3',
          },
        ],
      },
      {
        id: 'ADMIN',
        label: this.translationService.translate('ADMIN'),
        iconClasses: 'fa fa-user-plus',
        route: 'admin',
        roles: [Roles.ADMIN],
        badges: [
          {
            label: 'admin',
            classes: 'badge--red',
          },
        ],
      },
      {
        id: 'ROLES',
        label: this.translationService.translate<string>('ROLES'),
        iconClasses: 'fa fa-lock',
        children: [
          {
            id: 'ROLES-ADMIN_AND_EDITOR',
            label: this.translationService.translate('ADMIN_AND_EDITOR'),
            route: '/roles/admin-editor',
            roles: [Roles.ADMIN, Roles.EDITOR],
          },
          {
            id: 'ROLES-ADMIN',
            label: this.translationService.translate('ADMIN'),
            route: '/roles/admin',
            roles: [Roles.ADMIN],
          },
          {
            id: 'ROLES-EDITOR',
            label: this.translationService.translate('EDITOR'),
            route: '/roles/editor',
            roles: [Roles.EDITOR],
          },
        ],
      },
      {
        id: 'CHILD_ROUTES',
        label: this.translationService.translate('CHILD_ROUTES'),
        iconClasses: 'fa fa-level-down',
        route: 'child-routes',
        linkActiveExact: false,
      },
      {
        id: 'BADGES',
        label: this.translationService.translate('BADGES'),
        iconClasses: 'fa fa-star',
        route: 'badges',
        badges: [
          {
            label: 'new',
            classes: 'badge--red',
          },
          {
            label: '1',
            classes: 'badge--blue',
          },
        ],
      },
      {
        id: 'EXTERNAL_LINK',
        label: this.translationService.translate('EXTERNAL_LINK'),
        iconClasses: 'fa fa-external-link',
        url: '//google.com',
      },
    ];

    this.menu.next(menu);
  }
}

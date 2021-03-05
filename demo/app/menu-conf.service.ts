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
        header: translate<string>('DOCUMENTATION'),
      },
      {
        label: translate('GET_STARTED'),
        route: '/',
        iconClasses: 'fa fa-rocket',
      },
      {
        label: this.translationService.translate('CONFIGURATION'),
        route: '/configuration',
        iconClasses: 'fa fa-cog',
      },
      {
        label: this.translationService.translate('MENU_DEFINITION'),
        route: '/menu-definition',
        iconClasses: 'fa fa-cube',
      },
      {
        header: this.translationService.translate<string>('DEMO'),
      },
      {
        label: this.translationService.translate<string>('MULTILEVEL'),
        iconClasses: 'fa fa-share',
        roles: [],
        children: [
          {
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
            label: this.translationService.translate<string>('LEVEL_ONE'),
            children: [
              {
                label: this.translationService.translate<string>('LEVEL_TWO'),
                children: [
                  {
                    label: this.translationService.translate('LEVEL_THREE'),
                    route: '/level-three-1',
                  },
                  {
                    label: this.translationService.translate('LEVEL_THREE'),
                    route: '/level-three-2',
                  },
                  {
                    label: this.translationService.translate('LEVEL_THREE'),
                    route: '/level-three-3',
                  },
                ],
              },
              {
                label: this.translationService.translate<string>('LEVEL_TWO'),
                children: [
                  {
                    label: this.translationService.translate('LEVEL_THREE'),
                    route: '/level-three-2-1',
                  },
                  {
                    label: this.translationService.translate('LEVEL_THREE'),
                    route: '/level-three-2-2',
                  },
                  {
                    label: this.translationService.translate('LEVEL_THREE'),
                    route: '/level-three-2-3',
                  },
                ],
              },
              {
                label: this.translationService.translate('LEVEL_TWO'),
                route: '/level-two-1',
              },
              {
                label: this.translationService.translate('LEVEL_TWO'),
                route: '/level-two-2',
              },
            ],
          },
          {
            header: this.translationService.translate<string>('LEVEL_ONE_HEADER'),
          },
          {
            label: this.translationService.translate('LEVEL_ONE'),
            route: '/level-one-2',
          },
        ],
      },
      {
        label: this.translationService.translate<string>('ROUTE_WITH_PARAMETERS'),
        iconClasses: 'fa fa-sliders',
        children: [
          {
            label: this.translationService.translate<string>('ROUTE_ID'),
            children: [
              {
                label: this.translationService.translate('SUB_ROUTE_ID_ONE'),
                route: '/route-id/route-id-two/1',
              },
            ],
          },
          {
            label: this.translationService.translate('ROUTE_ID_ONE'),
            route: '/route-id-one/1',
          },
          {
            label: this.translationService.translate('ROUTE_ID_TWO'),
            route: '/route-id-one/2',
          },
          {
            label: this.translationService.translate('ROUTE_ID_THREE'),
            route: '/route-id-one/3',
          },
        ],
      },
      {
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
        label: this.translationService.translate<string>('ROLES'),
        iconClasses: 'fa fa-lock',
        children: [
          {
            label: this.translationService.translate('ADMIN_AND_EDITOR'),
            route: '/roles/admin-editor',
            roles: [Roles.ADMIN, Roles.EDITOR],
          },
          {
            label: this.translationService.translate('ADMIN'),
            route: '/roles/admin',
            roles: [Roles.ADMIN],
          },
          {
            label: this.translationService.translate('EDITOR'),
            route: '/roles/editor',
            roles: [Roles.EDITOR],
          },
        ],
      },
      {
        label: this.translationService.translate('CHILD_ROUTES'),
        iconClasses: 'fa fa-level-down',
        route: 'child-routes',
        linkActiveExact: false,
      },
      {
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
        label: this.translationService.translate('EXTERNAL_LINK'),
        iconClasses: 'fa fa-external-link',
        url: '//google.com',
      },
    ];

    this.menu.next(menu);
  }
}

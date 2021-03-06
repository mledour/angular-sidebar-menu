import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UnAuthorizedVisibility } from '../sidebar-menu.interface';

export type Role = string | number;

@Injectable()
export class RoleService {
  private role$ = new BehaviorSubject<Role | undefined>(undefined);
  private unAuthorizedVisibility$ = new BehaviorSubject<UnAuthorizedVisibility>('hidden');

  set role(role: Role | undefined) {
    this.role$.next(role);
  }

  set unAuthorizedVisibility(visibility: UnAuthorizedVisibility) {
    this.unAuthorizedVisibility$.next(visibility);
  }

  showItem$(roles?: Role[]): Observable<boolean> {
    return this.itemVisibilityBase$(roles).pipe(
      map((values) => values.isAuthorized || (!values.isAuthorized && values.unAuthorizedVisibility !== 'hidden'))
    );
  }

  disableItem$(roles?: Role[]): Observable<boolean> {
    return this.itemVisibilityBase$(roles).pipe(
      map((values) => !values.isAuthorized && values.unAuthorizedVisibility === 'disabled')
    );
  }

  private itemVisibilityBase$(
    roles?: Role[]
  ): Observable<{ isAuthorized: boolean; unAuthorizedVisibility: UnAuthorizedVisibility }> {
    return combineLatest([
      this.role$.pipe(map((role) => this.isAuthorized(role, roles))),
      this.unAuthorizedVisibility$,
    ]).pipe(map((value) => ({ isAuthorized: value[0], unAuthorizedVisibility: value[1] })));
  }

  private isRole(role?: Role): boolean {
    return typeof role === 'string' || typeof role === 'number';
  }

  private isAuthorized(userRole?: Role, itemRoles?: Role[]): boolean {
    if (!this.isRole(userRole) || !itemRoles || itemRoles.length === 0) {
      return true;
    }

    return (itemRoles as Role[]).includes(userRole as Role);
  }
}

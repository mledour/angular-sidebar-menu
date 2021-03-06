import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class SearchService {
  private _search = new Subject<string>();
  public search$ = this._search.asObservable();

  set search(value: string | undefined) {
    this._search.next(value);
  }

  public filter(search?: string, label?: string): boolean {
    if (!search || !label) {
      return false;
    }

    return !label.toLowerCase().includes(search.toLowerCase());
  }
}

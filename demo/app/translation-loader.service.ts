import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Translation, TranslocoLoader } from '@ngneat/transloco';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslationLoaderService implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<Translation> {
    return this.http.get<Translation>(`./assets/i18n/${lang}.json`);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { MenuItemNodeComponent } from './menu-item-node.component';

@Injectable()
export class MenuItemNodeService {
  public openedNode = new Subject<{ nodeComponent: MenuItemNodeComponent; nodeLevel: number }>();
  public toggleIconClasses?: string;
}
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { SidebarMenuItemComponent } from './sidebar-menu-item.component';

@Injectable()
export class SidebarMenuItemService {
  public openedNode = new Subject<SidebarMenuItemComponent>();
}

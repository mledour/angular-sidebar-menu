import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { NodeComponent } from './node.component';

@Injectable()
export class NodeService {
  public openedNode = new Subject<{ nodeComponent: NodeComponent; nodeLevel: number }>();
  public toggleIconClasses?: string;
}

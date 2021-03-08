import { TrackByFunction } from '@angular/core';

import { MenuItem } from '../sidebar-menu.interface';

export const trackByItem: TrackByFunction<MenuItem> = (index, item) => {
  return item.id || index;
};

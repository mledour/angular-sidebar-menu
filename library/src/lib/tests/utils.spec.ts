import { Router } from '@angular/router';
import { tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { cssSelectors } from './css-selectors.spec';
import { Menu, MenuItemLeafRoute } from '../sidebar-menu.interface';

export const navigateTo = (router: Router, route: string): void => {
  router.navigateByUrl(route);
  tick();
};

export const clickElement = (debugElement: DebugElement, itemIndex: number): void => {
  const elements = debugElement.queryAll(By.css('a'));
  elements[itemIndex].triggerEventHandler('click', { button: 0 });
  tick();
};

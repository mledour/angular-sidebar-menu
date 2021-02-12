import { Router } from '@angular/router';
import { ComponentFixture, tick } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Menu, MenuItem } from '../sidebar-menu.interface';

export const navigateTo = (router: Router, route: string): void => {
  router.navigateByUrl(route);
  tick();
};

export const clickElement = (debugElement: DebugElement, label?: string, fixture?: ComponentFixture<any>): void => {
  const elements = debugElement.queryAll(By.css(`a`));
  const element = elements.find((el) => el.nativeElement.textContent === label);

  if (!element) {
    throw new Error(`Could not find element with label: ${label}`);
  }

  element.triggerEventHandler('click', { button: 0 });

  tick();
  if (fixture) {
    fixture.detectChanges();
  }
};

export const menuLengthRecursive = (menu: Menu, acc = 0): number => {
  return menu.reduce((rAcc: number, rMenu: MenuItem, val: number): number => {
    if (rMenu.children) {
      return menuLengthRecursive(rMenu.children, rAcc) + 1;
    }

    return rAcc + 1;
  }, acc);
};

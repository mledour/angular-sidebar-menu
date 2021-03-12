import { ComponentHarness } from '@angular/cdk/testing';
import { BaseHarnessFilters, HarnessPredicate } from '@angular/cdk/testing';

interface MenuItemHarnessFilters extends BaseHarnessFilters {
  label?: string | RegExp;
}

class MenuItemHarness extends ComponentHarness {
  static hostSelector = '[asm-menu-item]';

  getLabelElement = this.locatorFor('.asm-menu-anchor__label, .asm-menu-item__header');
  getLinkElement = this.locatorFor('asm-menu-anchor a');
  getBadgesElement = this.locatorForAll('.asm-badges__badge');

  static with(options: MenuItemHarnessFilters): HarnessPredicate<MenuItemHarness> {
    return new HarnessPredicate(MenuItemHarness, options).addOption('label', options.label, (harness, label) =>
      HarnessPredicate.stringMatches(harness.getItemLabel(), label)
    );
  }

  async getItemLabel(): Promise<string> {
    const el = await this.getLabelElement();
    return el.text();
  }

  async isFiltered(): Promise<boolean> {
    const el = await this.host();
    return el.hasClass('asm-menu-item--filtered');
  }
}

export class MenuHarness extends ComponentHarness {
  static hostSelector = 'asm-angular-sidebar-menu';

  getItems = this.locatorForAll(MenuItemHarness);
  getItemsHeaders = this.locatorForAll('.asm-menu-item__header');
  getItemsWithIcons = this.locatorForAll('.asm-menu-anchor__icon');
  getItemsWithBadges = this.locatorForAll('.asm-badges');
  getActivatedAnchors = this.locatorForAll('.asm-menu-anchor--active');
  getActivatedAnchorsLabels = this.locatorForAll('.asm-menu-anchor--active .asm-menu-anchor__label');
  getOpenedNodes = this.locatorForAll('.asm-menu-node--open');
  getOpenedNodesLabels = this.locatorForAll('.asm-menu-node--open > asm-menu-anchor .asm-menu-anchor__label');
  getDisabledItems = this.locatorForAll('.asm-menu-item--disabled');
  getFilteredItems = this.locatorForAll('.asm-menu-item--filtered');
  getFilteredNodes = this.locatorForAll('.asm-menu-node--filtered');

  async getItemsWith(filters: MenuItemHarnessFilters = {}): Promise<MenuItemHarness[]> {
    const getFilteredItems = this.locatorForAll(MenuItemHarness.with(filters));
    return getFilteredItems();
  }

  async getItemWith(filters: MenuItemHarnessFilters = {}): Promise<MenuItemHarness> {
    const getFilteredItem = this.locatorFor(MenuItemHarness.with(filters));
    return getFilteredItem();
  }

  async clickItemWith(filters: MenuItemHarnessFilters = {}): Promise<void> {
    const item = await this.getItemWith(filters);
    return (await item.getLinkElement()).click();
  }
}

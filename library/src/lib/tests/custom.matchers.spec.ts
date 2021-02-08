import { DebugElement } from '@angular/core';

export const customMatchers: jasmine.CustomMatcherFactories = {
  toHaveClasses(util: jasmine.MatchersUtil, customEqualityTesters: ReadonlyArray<jasmine.CustomEqualityTester>): jasmine.CustomMatcher {
    return {
      compare(actual: DebugElement, expected?: string): jasmine.CustomMatcherResult {
        if (!(actual.nativeElement.classList.contains instanceof Function)) {
          throw new Error(util.pp(actual) + ' is not a Debug element');
        }

        const expectedClasses = (expected && expected.split(' ').filter((v) => v.length)) || [];

        if (!expectedClasses.length) {
          throw new Error('expected value do not contain css classes');
        }

        return {
          pass: !expectedClasses.find((cssClass) => !actual.nativeElement.classList.contains(cssClass)),
        };
      },
    };
  },

  toHaveText(util: jasmine.MatchersUtil, customEqualityTesters: ReadonlyArray<jasmine.CustomEqualityTester>): jasmine.CustomMatcher {
    return {
      compare(actual: DebugElement, expected?: string): jasmine.CustomMatcherResult {
        if (!actual.nativeElement.textContent) {
          throw new Error(util.pp(actual) + ' is not a Debug element');
        }

        return {
          pass: actual.nativeElement.textContent === expected,
        };
      },
    };
  },
};

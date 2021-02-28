import { TestElement } from '@angular/cdk/testing';

export const customMatchers: jasmine.CustomMatcherFactories = {
  toHaveClasses(
    util: jasmine.MatchersUtil,
    customEqualityTesters: ReadonlyArray<jasmine.CustomEqualityTester>
  ): jasmine.CustomMatcher {
    return {
      compare(actual: TestElement, expected?: string): jasmine.CustomMatcherResult {
        if (!(actual.hasClass instanceof Function)) {
          throw new Error(util.pp(actual) + ' is not a TestElement');
        }

        const expectedClasses = (expected && expected.split(' ').filter((v) => v.length)) || [];

        if (!expectedClasses.length) {
          throw new Error('expected value do not contain css classes');
        }

        return {
          pass: !expectedClasses.find((cssClass) => !actual.hasClass(cssClass)),
          message: `Expected '${actual.getAttribute('class')}' to have classes '${expected}'`,
        };
      },
    };
  },
};

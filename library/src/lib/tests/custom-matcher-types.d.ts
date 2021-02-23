// tslint:disable-next-line:no-namespace
declare namespace jasmine {
  interface Matchers<T> {
    toHaveClasses(expected?: string, expectationFailOutput?: any): boolean;
  }
}

import { conditionalReverse } from '../general';

describe('conditionalReverse', () => {
  const arr = ['foo', 'bar'];
  it('reverses an array if condition is met', () => {
    // eslint-disable-next-line no-self-compare
    const condition = true;
    const currentResult = conditionalReverse(condition, arr);
    expect(currentResult).toEqual(['bar', 'foo']);
  });
  it("return identical array if conditions aren't met", () => {
    const condition = false;
    const currentResult = conditionalReverse(condition, arr);
    expect(currentResult).toEqual(arr);
  });
});

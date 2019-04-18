import { conditionalReverse, argbToRgbaConverter } from '../general';

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

describe('argbToRgbaConverter', () => {
  const argb = '#ff000000';
  const rgba = '#000000ff';

  it('converts argb to rgba', () => {
    const currentResult = argbToRgbaConverter(argb);
    expect(currentResult).toEqual(rgba);
  });

  it("Doesn't change rgb strings", () => {
    const rgb = '#ffffff';
    const currentResult = argbToRgbaConverter(rgb);
    expect(currentResult).toEqual(rgb);
  });
});

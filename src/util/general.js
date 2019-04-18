import {
  reverse,
  when,
  always,
  compose,
  lt,
  length,
  join,
  prepend,
  drop,
  splitAt,
  curry,
  mapObjIndexed,
  contains
} from 'ramda';

export const conditionalReverse = (condition, arr) =>
  when(always(condition), reverse)(arr);

export const argbToRgbaConverter = when(
  compose(
    lt(7),
    length
  ),
  compose(
    join(''),
    prepend('#'),
    reverse,
    splitAt(2),
    drop(1)
  )
);

export const applyToKeys = curry((keys, func, obj) =>
  mapObjIndexed((val, key) => (contains(key, keys) ? func(val) : val))(obj)
);

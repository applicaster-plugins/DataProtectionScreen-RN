import { reverse, when, always } from 'ramda';

export const conditionalReverse = (condition, arr) =>
  when(always(condition), reverse)(arr);

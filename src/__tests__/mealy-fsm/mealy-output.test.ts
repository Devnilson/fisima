import { createMealyOutput } from '../../lib/mealy-fsm/mealy-output.fn';
import { MealyTransition } from '../../lib/mealy-fsm/mealy-transition-map';

describe('Mealy-output', () => {
  it('should transition from A->B', () => {
    const outputFn = createMealyOutput(new Map([['A', new Map([['1', new MealyTransition<string>('B', 'output')]])]]));
    expect(outputFn({ currentNode: 'A' }, '1', 'B')).toBe('output');
  });

  it('should not transition on non existing event', () => {
    const outputFn = createMealyOutput(new Map([['A', new Map([['1', new MealyTransition<string>('B', 'output')]])]]));
    expect(outputFn({ currentNode: 'A' }, 'X', 'B')).toEqual(Object.create(null));
  });

  it('should not transition on non existing node', () => {
    const outputFn = createMealyOutput(new Map([['A', new Map([['1', new MealyTransition<string>('B', 'output')]])]]));
    expect(outputFn({ currentNode: 'X' }, '1', 'B')).toEqual(Object.create(null));
  });
});

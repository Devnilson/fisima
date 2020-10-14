import { createMealyTransitions } from '../../lib/mealy-fsm/mealy-transition.fn';
import { MealyTransition } from '../../lib/mealy-fsm/mealy-transition-map';

describe('deterministic-transitionFn', () => {
  it('should transition from A->B', () => {
    const transitionFn = createMealyTransitions(
      new Map([['A', new Map([['1', new MealyTransition<string>('B', 'output')]])]]),
    );
    expect(transitionFn({ currentNode: 'A' }, '1')).toBe('B');
  });

  it('should not transition on non existing event', () => {
    const transitionFn = createMealyTransitions(
      new Map([['A', new Map([['1', new MealyTransition<string>('B', 'output')]])]]),
    );
    expect(transitionFn({ currentNode: 'A' }, '2')).toBe('A');
  });

  it('should not transition on non existing node', () => {
    const transitionFn = createMealyTransitions(
      new Map([['A', new Map([['1', new MealyTransition<string>('B', 'output')]])]]),
    );
    expect(transitionFn({ currentNode: 'C' }, '1')).toBe('C');
  });

  it('should not transition on non existing node', () => {
    const transitionFn = createMealyTransitions(
      new Map([['A', new Map([['1', new MealyTransition<string>('B', 'output')]])]]),
    );
    expect(transitionFn({ currentNode: 'C' }, '1')).toBe('C');
  });
});

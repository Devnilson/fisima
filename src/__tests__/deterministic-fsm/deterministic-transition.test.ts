import { createDeterministicTransitions } from '../../lib/deterministic-fsm/deterministic-transition.fn';

describe('deterministic-transitionFn', () => {
  it('should transition from A->B', () => {
    const transitionFn = createDeterministicTransitions(new Map([['A', new Map([['1', 'B']])]]));
    expect(transitionFn({ currentNode: 'A' }, '1')).toBe('B');
  });

  it('should not transition on non existing event', () => {
    const transitionFn = createDeterministicTransitions(new Map([['A', new Map([['1', 'B']])]]));
    expect(transitionFn({ currentNode: 'A' }, '2')).toBe('A');
  });

  it('should not transition on non existing node', () => {
    const transitionFn = createDeterministicTransitions(new Map([['A', new Map([['1', 'B']])]]));
    expect(transitionFn({ currentNode: 'C' }, '1')).toBe('C');
  });

  it('should not transition on non existing node', () => {
    const transitionFn = createDeterministicTransitions(new Map([['A', new Map([['1', 'B']])]]));
    expect(transitionFn({ currentNode: 'C' }, '1')).toBe('C');
  });
});

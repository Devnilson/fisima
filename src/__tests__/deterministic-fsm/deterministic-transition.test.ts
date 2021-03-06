import { createDeterministicTransitions } from '../../lib/deterministic-fsm/deterministic-transition.fn';

describe('deterministic-transitionFn', () => {
  it('should transition from A->B', () => {
    const transitionFn = createDeterministicTransitions(new Map([['A', new Map([['1', 'B']])]]));
    expect(transitionFn({ currentNode: { id: 'A' } }, '1')).toBe('B');
  });

  it('should not transition on non existing event', () => {
    const transitionFn = createDeterministicTransitions(new Map([['A', new Map([['1', 'B']])]]));
    expect(transitionFn({ currentNode: { id: 'A' } }, '2')).toBeUndefined();
  });

  it('should not transition on non existing node', () => {
    const transitionFn = createDeterministicTransitions(new Map([['A', new Map([['1', 'B']])]]));
    expect(transitionFn({ currentNode: { id: 'C' } }, '1')).toBeUndefined();
  });

  it('should not transition on non existing node', () => {
    const transitionFn = createDeterministicTransitions(new Map([['A', new Map([['1', 'B']])]]));
    expect(transitionFn({ currentNode: { id: 'C' } }, '1')).toBeUndefined();
  });
});

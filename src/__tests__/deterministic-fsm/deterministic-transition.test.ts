import { deterministicTransitionFn } from '../../lib/deterministic-fsm/deterministic-transition.fn';

describe('deterministic-transitionFn', () => {
  it('should transition from A->B', () => {
    const transitionFn = deterministicTransitionFn(new Map([['A', new Map([['1', 'B']])]]));
    expect(transitionFn({ currentNode: 'A' }, '1').currentNode).toBe('B');
  });

  it('should not transition on non existing event', () => {
    const transitionFn = deterministicTransitionFn(new Map([['A', new Map([['1', 'B']])]]));
    expect(transitionFn({ currentNode: 'A' }, '2').currentNode).toBe('A');
  });

  it('should not transition on non existing node', () => {
    const transitionFn = deterministicTransitionFn(new Map([['A', new Map([['1', 'B']])]]));
    expect(transitionFn({ currentNode: 'C' }, '1').currentNode).toBe('C');
  });

  it('should not transition on non existing node', () => {
    const transitionFn = deterministicTransitionFn(new Map([['A', new Map([['1', 'B']])]]));
    expect(transitionFn({ currentNode: 'C' }, '1').currentNode).toBe('C');
  });
});

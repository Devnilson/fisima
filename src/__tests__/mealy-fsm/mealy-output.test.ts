import { createMealyOutput } from '../../lib/mealy-fsm/mealy-output.fn';

describe('Mealy-output', () => {
  it('should transition from A->B', () => {
    const outputFn = createMealyOutput(new Map([['A', new Map([['1', 'output']])]]));
    expect(outputFn({ currentNode: { id: 'A' } }, '1', { id: 'B' })).toBe('output');
  });

  it('should not transition on non existing event', () => {
    const outputFn = createMealyOutput(new Map([['A', new Map([['1', 'output']])]]));
    expect(outputFn({ currentNode: { id: 'A' } }, 'X', { id: 'B' })).toBeUndefined();
  });

  it('should not transition on non existing node', () => {
    const outputFn = createMealyOutput(new Map([['A', new Map([['1', 'output']])]]));
    expect(outputFn({ currentNode: { id: 'x' } }, '1', { id: 'B' })).toBeUndefined();
  });
});

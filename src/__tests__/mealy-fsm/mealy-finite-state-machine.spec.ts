import { createMealyStateMachine } from '../../lib';

describe('mealy-state-machine with mealy-transition-fn', () => {
  const machine = createMealyStateMachine({
    initialNode: 'A',
    nodes: [
      {
        id: 'A',
        transitions: new Map([
          ['1', { node: 'B', output: 'output1' }],
          ['0', { node: 'A', output: 'output2' }],
        ]),
        final: true,
      },
      {
        id: 'B',
        transitions: new Map([
          ['1', { node: 'A', output: 'output3' }],
          ['0', { node: 'B', output: 'output4' }],
        ]),
        final: true,
      },
    ],
  });

  it('should move A->B->A', () => {
    machine.dispatch('1');
    expect(machine.currentState.currentNode.id).toBe('B');
    expect(machine.currentState.output).toBe('output1');
    machine.dispatch('1');
    expect(machine.currentState.currentNode.id).toBe('A');
    expect(machine.currentState.output).toBe('output3');
  });

  it('should move A->A', () => {
    machine.dispatch('0');
    expect(machine.currentState.currentNode.id).toBe('A');
    expect(machine.currentState.output).toBe('output2');
  });

  it('should move B->B', () => {
    machine.dispatch('1');
    machine.dispatch('0');
    expect(machine.currentState.currentNode.id).toBe('B');
    expect(machine.currentState.output).toBe('output4');
  });
});

import { createDeterministicMachine } from '../../lib';

describe('deterministic-state-machine with deterministic-transition-fn', () => {
  const machine = createDeterministicMachine({
    initialNode: 'A',
    nodes: [
      {
        id: 'A',
        transitions: new Map([
          ['1', 'B'],
          ['0', 'A'],
        ]),
        final: true,
      },
      {
        id: 'B',
        transitions: new Map([
          ['1', 'A'],
          ['0', 'B'],
        ]),
        final: true,
      },
    ],
  });

  it('should move A->B->A', () => {
    machine.dispatch('1');
    expect(machine.currentState.currentNode.id).toBe('B');
    expect(machine.currentState.output).toBeUndefined();
    machine.dispatch('1');
    expect(machine.currentState.currentNode.id).toBe('A');
    expect(machine.currentState.output).toBeUndefined();
  });

  it('should move A->A', () => {
    machine.dispatch('0');
    expect(machine.currentState.currentNode.id).toBe('A');
    expect(machine.currentState.output).toBeUndefined();
  });

  it('should move B->B', () => {
    machine.dispatch('1');
    machine.dispatch('0');
    expect(machine.currentState.currentNode.id).toBe('B');
    expect(machine.currentState.output).toBeUndefined();
  });
});

import { createMooreStateMachine, MooreNode } from '../../lib/moore-fsm';

describe('moore-state-machine', () => {
  const nodes: MooreNode<string>[] = [
    {
      id: 'A',
      transitions: new Map([
        ['1', 'B'],
        ['0', 'A'],
      ]),
      output: 'OutputA',
      final: true,
    },
    {
      id: 'B',
      transitions: new Map([
        ['0', 'B'],
        ['1', 'A'],
      ]),
      output: 'OutputB',
      final: true,
    },
  ];

  it('should move A->B->A', () => {
    const machine = createMooreStateMachine({
      initialNode: 'A',
      nodes,
    });

    machine.dispatch('1');
    expect(machine.currentState.currentNode.id).toBe('B');
    expect(machine.currentState.output).toBe('OutputB');
    machine.dispatch('1');
    expect(machine.currentState.currentNode.id).toBe('A');
    expect(machine.currentState.output).toBe('OutputA');
  });

  it('should move A->A', () => {
    const machine = createMooreStateMachine({
      initialNode: 'A',
      nodes,
    });
    machine.dispatch('0');
    expect(machine.currentState.currentNode.id).toBe('A');
    expect(machine.currentState.output).toBe('OutputA');
  });

  it('should move B->B', () => {
    const machine = createMooreStateMachine({
      initialNode: 'B',
      nodes,
    });
    machine.dispatch('0');
    expect(machine.currentState.currentNode.id).toBe('B');
    expect(machine.currentState.output).toBe('OutputB');
  });

  it('should not move when no transition', () => {
    const machine = createMooreStateMachine({
      initialNode: 'A',
      nodes,
    });
    machine.dispatch('2');
    expect(machine.currentState.currentNode.id).toBe('A');
    expect(machine.currentState.output).toBe('OutputA');
  });
});

import { createMooreStateMachine, MooreNode } from '../../lib/moore-fsm';

describe('moore-state-machine', () => {
  const nodes: MooreNode<string>[] = [
    {
      name: 'A',
      transitions: new Map([
        ['1', 'B'],
        ['0', 'A'],
      ]),
      output: 'OutputA',
      final: true,
    },
    {
      name: 'B',
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
      initialState: 'A',
      nodes,
    });

    machine.handle('1');
    expect(machine.getCurrentState().currentNode).toBe('B');
    expect(machine.getCurrentState().output).toBe('OutputB');
    machine.handle('1');
    expect(machine.getCurrentState().currentNode).toBe('A');
    expect(machine.getCurrentState().output).toBe('OutputA');
  });

  it('should move A->A', () => {
    const machine = createMooreStateMachine({
      initialState: 'A',
      nodes,
    });
    machine.handle('0');
    expect(machine.getCurrentState().currentNode).toBe('A');
    expect(machine.getCurrentState().output).toBe('OutputA');
  });

  it('should move B->B', () => {
    const machine = createMooreStateMachine({
      initialState: 'B',
      nodes,
    });
    machine.handle('0');
    expect(machine.getCurrentState().currentNode).toBe('B');
    expect(machine.getCurrentState().output).toBe('OutputB');
  });

  it('should not move when no transition', () => {
    const machine = createMooreStateMachine({
      initialState: 'A',
      nodes,
    });
    machine.handle('2');
    expect(machine.getCurrentState().currentNode).toBe('A');
    expect(machine.getCurrentState().output).toBe('OutputA');
  });

  it('should not move when state not defined', () => {
    const machine = createMooreStateMachine({
      initialState: 'C',
      nodes,
    });
    machine.handle('1');
    expect(machine.getCurrentState().currentNode).toBe('C');
    expect(machine.getCurrentState().output).toBeUndefined();
  });
});

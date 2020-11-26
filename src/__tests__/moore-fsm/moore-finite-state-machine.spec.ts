import { MooreOutputMap } from '../../lib/moore-fsm/moore-output-map';
import { MooreStateMachine } from '../../lib/moore-fsm';
import { MooreTransitionMap } from '../../lib/moore-fsm/moore-transition-map';

describe('moore-state-machine', () => {
  const finalStates = new Set(['A', 'B']);
  const transitions: MooreTransitionMap = new Map([
    [
      'A',
      new Map([
        ['1', 'B'],
        ['0', 'A'],
      ]),
    ],
    [
      'B',
      new Map([
        ['1', 'A'],
        ['0', 'B'],
        ['2', 'C'],
      ]),
    ],
    [
      'C',
      new Map([
        ['1', 'A'],
        ['0', 'B'],
      ]),
    ],
  ]);
  const outputs: MooreOutputMap<string> = new Map([
    ['A', 'OutputA'],
    ['B', 'OutputB'],
  ]);

  it('should move A->B->A', () => {
    const machine = new MooreStateMachine('A', finalStates, transitions, outputs);
    machine.handle('1');
    expect(machine.getCurrentState().currentNode).toBe('B');
    expect(machine.getCurrentState().output).toBe('OutputB');
    machine.handle('1');
    expect(machine.getCurrentState().currentNode).toBe('A');
    expect(machine.getCurrentState().output).toBe('OutputA');
  });

  it('should move A->A', () => {
    const machine = new MooreStateMachine('A', finalStates, transitions, outputs);
    machine.handle('0');
    expect(machine.getCurrentState().currentNode).toBe('A');
    expect(machine.getCurrentState().output).toBe('OutputA');
  });

  it('should move B->B', () => {
    const machine = new MooreStateMachine('B', finalStates, transitions, outputs);
    machine.handle('0');
    expect(machine.getCurrentState().currentNode).toBe('B');
    expect(machine.getCurrentState().output).toBe('OutputB');
  });

  it('should not move when no transition', () => {
    const machine = new MooreStateMachine('A', finalStates, transitions, outputs);
    machine.handle('2');
    expect(machine.getCurrentState().currentNode).toBe('A');
    expect(machine.getCurrentState().output).toBe('OutputA');
  });

  it('should not have output when not defined', () => {
    const machine = new MooreStateMachine('B', finalStates, transitions, outputs);
    machine.handle('2');
    expect(machine.getCurrentState().currentNode).toBe('C');
    expect(machine.getCurrentState().output).toBeUndefined();
  });

  it('should not move when state not defined', () => {
    const machine = new MooreStateMachine('D', finalStates, transitions, outputs);
    machine.handle('1');
    expect(machine.getCurrentState().currentNode).toBe('D');
    expect(machine.getCurrentState().output).toBeUndefined();
  });
});

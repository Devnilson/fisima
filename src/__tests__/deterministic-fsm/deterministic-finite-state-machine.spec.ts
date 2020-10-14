import { DeterministicStateMachine } from '../../lib';
import { DeterministicTransitions } from '../../lib/deterministic-fsm/deterministic-transition-map';

describe('deterministic-state-machine with deterministic-transition-fn', () => {
  const initialState = 'A';
  const finalStates = new Set(['A', 'B']);
  const transitions: DeterministicTransitions = new Map([
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
      ]),
    ],
  ]);
  const machine = new DeterministicStateMachine(initialState, finalStates, transitions);

  it('should move A->B->A', () => {
    machine.handle('1');
    expect(machine.getCurrentState().currentNode).toBe('B');
    machine.handle('1');
    expect(machine.getCurrentState().currentNode).toBe('A');
  });

  it('should move A->A', () => {
    machine.handle('0');
    expect(machine.getCurrentState().currentNode).toBe('A');
  });

  it('should move B->B', () => {
    machine.handle('1');
    machine.handle('0');
    expect(machine.getCurrentState().currentNode).toBe('B');
  });
});

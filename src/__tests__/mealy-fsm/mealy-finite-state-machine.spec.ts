import { MealyStateMachine } from '../../lib';
import { MealyTransitionMap, MealyTransition } from '../../lib/mealy-fsm/mealy-transition-map';

describe('mealy-state-machine with mealy-transition-fn', () => {
  const initialState = 'A';
  const finalStates = new Set(['A', 'B']);
  const transitions: MealyTransitionMap<string> = new Map([
    [
      'A',
      new Map([
        ['1', new MealyTransition<string>('B', 'output1')],
        ['0', new MealyTransition<string>('A', 'output2')],
      ]),
    ],
    [
      'B',
      new Map([
        ['1', new MealyTransition<string>('A', 'output3')],
        ['0', new MealyTransition<string>('B', 'output4')],
      ]),
    ],
  ]);
  const machine = new MealyStateMachine(initialState, finalStates, transitions);

  it('should move A->B->A', () => {
    machine.handle('1');
    expect(machine.getCurrentState().currentNode).toBe('B');
    expect(machine.getCurrentState().output).toBe('output1');
    machine.handle('1');
    expect(machine.getCurrentState().currentNode).toBe('A');
    expect(machine.getCurrentState().output).toBe('output3');
  });

  it('should move A->A', () => {
    machine.handle('0');
    expect(machine.getCurrentState().currentNode).toBe('A');
    expect(machine.getCurrentState().output).toBe('output2');
  });

  it('should move B->B', () => {
    machine.handle('1');
    machine.handle('0');
    expect(machine.getCurrentState().currentNode).toBe('B');
    expect(machine.getCurrentState().output).toBe('output4');
  });
});

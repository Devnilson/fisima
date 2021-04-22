import { GenericStateMachine } from '../../lib';

describe('deterministic-state-machine', () => {
  it('should start at initial state', () => {
    const machine = new GenericStateMachine(
      { currentNode: { id: 'A' } },
      [{ id: 'A' }],
      (_state, _event) => _state.currentNode.id,
      (_state, _event) => 1,
    );

    expect(machine.currentState.currentNode.id).toBe('A');
    expect(machine.currentState.output).toBeUndefined();
  });

  it('should stay at inital state', () => {
    const machine = new GenericStateMachine(
      { currentNode: { id: 'A' } },
      [{ id: 'A' }],
      (_state, _event) => _state.currentNode.id,
      (_state, _event) => 1,
    );

    const transition = machine.dispatch('X');
    expect(transition.currentNode.id).toBe('A');
    expect(transition.output).toBe(1);
    expect(machine.currentState.currentNode.id).toBe('A');
    expect(machine.currentState.output).toBe(1);
  });

  it('should update current state when transitioning', () => {
    const machine = new GenericStateMachine(
      { currentNode: { id: 'A' } },
      [{ id: 'A' }, { id: 'B' }],
      (_state, _event) => 'B',
      (_state, _event) => 1,
    );

    const transition = machine.dispatch('X');
    expect(transition.currentNode.id).toBe('B');
    expect(transition.output).toBe(1);
    expect(machine.currentState.currentNode.id).toBe('B');
    expect(machine.currentState.output).toBe(1);
  });

  it('should get final node', () => {
    const machine = new GenericStateMachine(
      { currentNode: { id: 'A' } },
      [{ id: 'A' }, { id: 'B', final: true }],
      (_state, _event) => 'B',
      (_state, _event) => 1,
    );

    const transition = machine.dispatch('X');
    expect(machine.currentState.currentNode.id).toBe('B');
    expect(machine.currentState.currentNode.final).toBeTruthy();
    expect(machine.currentState.output).toBe(1);
  });
});

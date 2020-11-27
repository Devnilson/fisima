import { GenericStateMachine } from '../../lib';

describe('deterministic-state-machine', () => {
  it('should start at inital state', () => {
    const machine = new GenericStateMachine(
      'A',
      new Set(['A']),
      (_state, _event) => _state.currentNode,
      (_state, _event) => 1,
    );

    expect(machine.getCurrentState().currentNode).toBe('A');
    expect(machine.getCurrentState().output).toBeUndefined();
  });

  it('should stay at inital state', () => {
    const machine = new GenericStateMachine(
      'A',
      new Set(['A']),
      (_state, _event) => _state.currentNode,
      (_state, _event) => 1,
    );

    const transition = machine.handle('X');
    expect(transition.currentNode).toBe('A');
    expect(transition.output).toBe(1);
    expect(machine.getCurrentState().currentNode).toBe('A');
    expect(machine.getCurrentState().output).toBe(1);
  });

  it('should update current state when transitioning', () => {
    const machine = new GenericStateMachine(
      'A',
      new Set(['A']),
      (_state, _event) => 'B',
      (_state, _event) => 1,
    );

    const transition = machine.handle('X');
    expect(transition.currentNode).toBe('B');
    expect(transition.output).toBe(1);
    expect(machine.getCurrentState().currentNode).toBe('B');
    expect(machine.getCurrentState().output).toBe(1);
  });

  describe('canClose', () => {
    it('should be true when at final state', () => {
      const machine = new GenericStateMachine(
        'A',
        new Set(['A']),
        (_state, _event) => 'B',
        (_state, _event) => 1,
      );
      expect(machine.canClose()).toBeTruthy();
    });

    it('should not be false when not at final state', () => {
      const machine = new GenericStateMachine(
        'A',
        new Set(['B']),
        (_state, _event) => 'B',
        (_state, _event) => 1,
      );
      expect(machine.canClose()).toBeFalsy();
    });
  });

  describe('close & isClosed', () => {
    it('should be false when not yet closed', () => {
      const machine = new GenericStateMachine(
        'A',
        new Set(['A']),
        (_state, _event) => 'B',
        (_state, _event) => 1,
      );
      expect(machine.isClosed()).toBeFalsy();
    });

    it('should be true when closed', () => {
      const machine = new GenericStateMachine(
        'A',
        new Set(['A']),
        (_state, _event) => 'B',
        (_state, _event) => 1,
      );
      machine.close();
      expect(machine.isClosed()).toBeTruthy();
    });

    it('should throw an error if we close an already closed machine', () => {
      const machine = new GenericStateMachine(
        'A',
        new Set(['A']),
        (_state, _event) => 'B',
        (_state, _event) => 1,
      );
      machine.close();
      expect(() => machine.close()).toThrowError();
    });

    it('should throw an error if we close when not at final state', () => {
      const machine = new GenericStateMachine(
        'A',
        new Set(['B']),
        (_state, _event) => 'B',
        (_state, _event) => 1,
      );
      expect(() => machine.close()).toThrowError();
    });

    it('should throw an error if we call handle on a closed machine', () => {
      const machine = new GenericStateMachine(
        'A',
        new Set(['A']),
        (_state, _event) => 'B',
        (_state, _event) => 1,
      );
      machine.close();
      expect(() => machine.handle('X')).toThrowError();
    });
  });
});

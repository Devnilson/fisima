import { GenericStateMachine } from '../../lib';

describe('deterministic-state-machine', () => {
  it('should start at inital state', () => {
    var machine = new GenericStateMachine('A', new Set(['A']), (_state, _event) => _state);

    expect(machine.getCurrentState().currentNode).toBe('A');
  });

  it('should stay at inital state', () => {
    var machine = new GenericStateMachine('A', new Set(['A']), (_state, _event) => _state);

    expect(machine.handle('X').currentNode).toBe('A');
    expect(machine.getCurrentState().currentNode).toBe('A');
  });

  it('should update current state when transitioning', () => {
    var machine = new GenericStateMachine('A', new Set(['A']), (_state, _event) => ({ currentNode: 'B' }));

    expect(machine.handle('X').currentNode).toBe('B');
    expect(machine.getCurrentState().currentNode).toBe('B');
  });

  describe('canClose', () => {
    it('should be true when at final state', () => {
      var machine = new GenericStateMachine('A', new Set(['A']), (_state, _event) => ({ currentNode: 'B' }));
      expect(machine.canClose()).toBeTruthy();
    });

    it('should not be false when not at final state', () => {
      var machine = new GenericStateMachine('A', new Set(['B']), (_state, _event) => ({ currentNode: 'B' }));
      expect(machine.canClose()).toBeFalsy();
    });
  });

  describe('close & isClosed', () => {
    it('should be false when not yet closed', () => {
      var machine = new GenericStateMachine('A', new Set(['A']), (_state, _event) => ({ currentNode: 'B' }));
      expect(machine.isClosed()).toBeFalsy();
    });

    it('should be true when closed', () => {
      var machine = new GenericStateMachine('A', new Set(['A']), (_state, _event) => ({ currentNode: 'B' }));
      machine.close();
      expect(machine.isClosed()).toBeTruthy();
    });

    it('should throw an error if we close an already closed machine', () => {
      var machine = new GenericStateMachine('A', new Set(['A']), (_state, _event) => ({ currentNode: 'B' }));
      machine.close();
      expect(() => machine.close()).toThrowError();
    });

    it('should throw an error if we close when not at final state', () => {
      var machine = new GenericStateMachine('A', new Set(['B']), (_state, _event) => ({ currentNode: 'B' }));
      expect(() => machine.close()).toThrowError();
    });

    it('should throw an error if we call handle on a closed machine', () => {
      var machine = new GenericStateMachine('A', new Set(['A']), (_state, _event) => ({ currentNode: 'B' }));
      machine.close();
      expect(() => machine.handle('X')).toThrowError();
    });
  });
});

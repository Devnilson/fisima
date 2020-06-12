import fsm from '../lib/fsm';

describe('fsm-tests', () => {
  it('should export fsm', () => {
    let sut = new fsm('initial', []);

    expect(sut).not.toBe(undefined);
    expect(sut).not.toBe(null);
  });
});

describe('fsm-tests', () => {
  it('Initial state is <initial>', () => {
    const initialState = 'initial';

    let sut = new fsm(initialState, []);

    expect(sut.CurrentState()).toBe(initialState);
  });
});

describe('fsm-tests', () => {
  it('Can handle a unknown message without transition', () => {
    const initialState = 'initial';

    let sut = new fsm(initialState, []);
    sut.handle('test-message');

    expect(sut.CurrentState()).toBe(initialState);
  });
});

describe('fsm-tests', () => {
  it('Can handle a known message to transition', () => {
    const initialState = 'initial';
    const message = 'test-message';
    const toState = 'test-state';

    let sut = new fsm(initialState, [fsm.Transition(initialState, message, toState)]);

    sut.handle(message);
    expect(sut.CurrentState()).toBe(toState);
  });
});

describe('fsm-tests', () => {
  it('Can run a complex automata', () => {
    let sut = new fsm('A', [
      fsm.Transition('A', 'M1', 'B'),
      fsm.Transition('A', 'M2', 'C'),
      fsm.Transition('B', 'M1', 'A'),
      fsm.Transition('B', 'M2', 'C'),
      fsm.Transition('C', 'M3', 'D'),
      fsm.Transition('C', 'M4', 'A'),
      fsm.Transition('D', 'M1', 'A'),
      fsm.Transition('D', 'M2', 'C'),
    ]);

    expect(sut.CurrentState()).toBe('A');

    sut.handle('Unknown-Message');
    expect(sut.CurrentState()).toBe('A');

    sut.handle('M3'); //Not matching transition
    expect(sut.CurrentState()).toBe('A');

    sut.handle('M1');
    expect(sut.CurrentState()).toBe('B');

    sut.handle('M1');
    expect(sut.CurrentState()).toBe('A');

    sut.handle('M2');
    expect(sut.CurrentState()).toBe('C');

    sut.handle('M3');
    expect(sut.CurrentState()).toBe('D');

    sut.handle('M2');
    expect(sut.CurrentState()).toBe('C');

    sut.handle('M4');
    expect(sut.CurrentState()).toBe('A');

    sut.handle('M1');
    expect(sut.CurrentState()).toBe('B');

    sut.handle('M2');
    expect(sut.CurrentState()).toBe('C');
  });
});

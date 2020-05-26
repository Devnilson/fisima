import { StateMachineBuilder } from '..';

describe('awsm-fsm', () => {
  const createMachine = () =>
     new StateMachineBuilder<string>('a', 'A')
      .withNode('a')
      .withTransition('a-to-b', 'b', () => 'B-FROM-A')
      .withTransition('a-to-c', 'c', () => 'C-FROM-A')
      .and()
      .withNode('b')
      .withTransition('b-to-c', 'c', () => 'C-FROM-B')
      .withTransition('b-to-a', 'a', () => 'A-FROM-B')
      .and()
      .withNode('c')
      .withTransition('c-to-b', 'b', () => 'B-FROM-C')
      .and()
      .build();

  it('should run', () => {
    const machine = createMachine();

    machine.dispatch({ type: 'a-to-b' });
    expect(machine.getCurrentState().name).toBe('b');
    expect(machine.getCurrentState().data).toBe('B-FROM-A');
  });

  it('should transition through states', () => {
    const machine = createMachine();

    machine.dispatch({ type: 'a-to-b' });
    expect(machine.getCurrentState().name).toBe('b');
    expect(machine.getCurrentState().data).toBe('B-FROM-A');

    machine.dispatch({ type: 'b-to-a' });
    expect(machine.getCurrentState().name).toBe('a');
    expect(machine.getCurrentState().data).toBe('A-FROM-B');

    machine.dispatch({ type: 'a-to-c' });
    expect(machine.getCurrentState().name).toBe('c');
    expect(machine.getCurrentState().data).toBe('C-FROM-A');
  });

  it('should not transition when events are fired and no transition from it', () => {
    const machine = createMachine();

    machine.dispatch({ type: 'b-to-a' });
    expect(machine.getCurrentState().name).toBe('a');
    expect(machine.getCurrentState().data).toBe('A');
    machine.getCurrentState()
  });

  it('should not transition for non existing events', () => {
    const machine = createMachine();

    machine.dispatch({ type: 'invent' });
    expect(machine.getCurrentState().name).toBe('a');
    expect(machine.getCurrentState().data).toBe('A');
  });

  it('should allow to create machine without transitions', () => {
    const machine = new StateMachineBuilder<string>('a')
      .withNode('a').withTransition('a-to-b', 'b')
      .and().withNode('b').withTransition('b-to-a', 'a')
      .and().build();

    machine.dispatch({ type: 'a-to-b' });
    expect(machine.getCurrentState().name).toBe('b');
    machine.dispatch({ type: 'b-to-a' });
    expect(machine.getCurrentState().name).toBe('a');
  });
});

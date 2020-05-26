import { RawStateMachineBuilder } from '..';
import { subscribeOn, take } from 'rxjs/operators';
import { asapScheduler } from 'rxjs';

describe('raw-state-machine', () => {
  const createMachine = () =>
     new RawStateMachineBuilder<string>('a', 'A')
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
    const currentState = machine.getCurrentState();
    expect(currentState.name).toBe('b');
    expect(currentState.data).toBe('B-FROM-A');
  });

  it('should transition through states', () => {
    const machine = createMachine();

    machine.dispatch({ type: 'a-to-b' });
    let currentState = machine.getCurrentState();
    expect(currentState.name).toBe('b');
    expect(currentState.data).toBe('B-FROM-A');

    machine.dispatch({ type: 'b-to-a' });
    currentState = machine.getCurrentState();
    expect(currentState.name).toBe('a');
    expect(currentState.data).toBe('A-FROM-B');

    machine.dispatch({ type: 'a-to-c' });
    currentState = machine.getCurrentState();
    expect(currentState.name).toBe('c');
    expect(currentState.data).toBe('C-FROM-A');
  });

  it('should not transition when events are fired and no transition from it', () => {
    const machine = createMachine();

    machine.dispatch({ type: 'b-to-a' });
    const currentState = machine.getCurrentState();
    expect(currentState.name).toBe('a');
    expect(currentState.data).toBe('A');
  });

  it('should not transition for non existing events', () => {
    const machine = createMachine();

    machine.dispatch({ type: 'invent' });
    const currentState = machine.getCurrentState();
    expect(currentState.name).toBe('a');
    expect(currentState.data).toBe('A');
  });

  it('should allow to create machine without transitions', () => {
    const machine = new RawStateMachineBuilder<string>('a')
      .withNode('a').withTransition('a-to-b', 'b')
      .and().withNode('b').withTransition('b-to-a', 'a')
      .and().build();

    machine.dispatch({ type: 'a-to-b' });
    let currentState = machine.getCurrentState();
    expect(currentState.name).toBe('b');
    machine.dispatch({ type: 'b-to-a' });
    currentState = machine.getCurrentState();
    expect(currentState.name).toBe('a');
  });
});

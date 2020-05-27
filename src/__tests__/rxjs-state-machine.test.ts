import { subscribeOn, take } from 'rxjs/operators';
import { asapScheduler } from 'rxjs';
import { RxjsStateMachineBuilder } from '../machine/builder/rxjs-state-machine.builder';

describe('rxjs-state-machine', () => {
  const createMachine = () =>
     new RxjsStateMachineBuilder<string>('a', 'A')
      .withNode('a')
      .withStaticTransition('a-to-b', 'b', () => 'B-FROM-A')
      .withStaticTransition('a-to-c', 'c', () => 'C-FROM-A')
      .and()
      .withNode('b')
      .withStaticTransition('b-to-c', 'c', () => 'C-FROM-B')
      .withStaticTransition('b-to-a', 'a', () => 'A-FROM-B')
      .and()
      .withNode('c')
      .withStaticTransition('c-to-b', 'b', () => 'B-FROM-C')
      .and()
      .build();

  it('should run', (done) => {
    const machine = createMachine();

    machine.dispatch({ type: 'a-to-b' });
    machine.getCurrentState().pipe(take(1), subscribeOn(asapScheduler)).subscribe(currentState => {
      expect(currentState.name).toBe('b');
      expect(currentState.data).toBe('B-FROM-A');
      done();
    });
  });

  it('should transition through states', () => {
    const machine = createMachine();

    machine.dispatch({ type: 'a-to-b' });
    machine.getCurrentState().pipe(take(1), subscribeOn(asapScheduler)).subscribe(currentState => {
      expect(currentState.name).toBe('b');
      expect(currentState.data).toBe('B-FROM-A');
    });

    machine.dispatch({ type: 'b-to-a' });
    machine.getCurrentState().pipe(take(1), subscribeOn(asapScheduler)).subscribe(currentState => {
      expect(currentState.name).toBe('a');
      expect(currentState.data).toBe('A-FROM-B');
    });

    machine.dispatch({ type: 'a-to-c' });
    machine.getCurrentState().pipe(take(1), subscribeOn(asapScheduler)).subscribe(currentState => {
      expect(currentState.name).toBe('c');
      expect(currentState.data).toBe('C-FROM-A');
    });
  });

  it('should not transition when events are fired and no transition from it', (done) => {
    const machine = createMachine();

    machine.dispatch({ type: 'b-to-a' });
    machine.getCurrentState().pipe(take(1), subscribeOn(asapScheduler)).subscribe(currentState => {
      expect(currentState.name).toBe('a');
      expect(currentState.data).toBe('A');
      done();
    });
  });

  it('should not transition for non existing events', (done) => {
    const machine = createMachine();

    machine.dispatch({ type: 'invent' });
    machine.getCurrentState().pipe(take(1), subscribeOn(asapScheduler)).subscribe(currentState => {
      expect(currentState.name).toBe('a');
      expect(currentState.data).toBe('A');
      done();
    });
  });

  it('should allow to create machine without transitions', () => {
    const machine = new RxjsStateMachineBuilder<string>('a')
      .withNode('a').withStaticTransition('a-to-b', 'b')
      .and().withNode('b').withStaticTransition('b-to-a', 'a')
      .and().build();

    machine.dispatch({ type: 'a-to-b' });
    machine.getCurrentState().pipe(take(1), subscribeOn(asapScheduler)).subscribe(currentState => {
      expect(currentState.name).toBe('b');
    });
    machine.dispatch({ type: 'b-to-a' });
    machine.getCurrentState().pipe(take(1), subscribeOn(asapScheduler)).subscribe(currentState => {
      expect(currentState.name).toBe('a');
    });
  });
});

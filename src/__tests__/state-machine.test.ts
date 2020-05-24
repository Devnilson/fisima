import {RawStateMachine, StateMachine} from "../machine/raw-state-machine";
import {TransitionAction} from "../machine/raw-transition";

describe('awsm-fsm', () => {

    const createMachine = () => {
        const machine = new RawStateMachine<string>({ name: 'a', data: 'A' });
        machine
            .addNode('a')
            .addTransition('a-to-b', 'b', () => 'B-FROM-A')
            .addTransition('a-to-c', 'c', () => 'C-FROM-A');
        machine
            .addNode('b')
            .addTransition('b-to-c', 'c', () => 'C-FROM-B')
            .addTransition('b-to-a', 'a', () => 'A-FROM-B');
        machine
            .addNode('c')
            .addTransition('c-to-b', 'b', () => 'B-FROM-C');
        return machine;
    };

    it('should run', () => {
        const machine = createMachine();

        const currentState = machine.dispatch({ name: 'a-to-b' });
        expect(currentState.name).toBe('b');
        expect(currentState.data).toBe('B-FROM-A');
        expect(machine.currentState).toBe(currentState);
    });

    it('should transition through states', () => {
        const machine = createMachine();

        let currentState = machine.dispatch({ name: 'a-to-b' });
        expect(currentState.name).toBe('b');
        expect(currentState.data).toBe('B-FROM-A');
        expect(machine.currentState).toBe(currentState);

        currentState  = machine.dispatch({ name: 'b-to-a' });
        expect(currentState.name).toBe('a');
        expect(currentState.data).toBe('A-FROM-B');
        expect(machine.currentState).toBe(currentState);

        currentState  = machine.dispatch({ name: 'a-to-c' });
        expect(currentState.name).toBe('c');
        expect(currentState.data).toBe('C-FROM-A');
        expect(machine.currentState).toBe(currentState);
    });

    it('should not transition when events are fired and no transition from it', () => {
        const machine = createMachine();

        let currentState = machine.dispatch({ name: 'b-to-a' });
        expect(currentState.name).toBe('a');
        expect(currentState.data).toBe('A');
        expect(machine.currentState).toBe(currentState);
    });


    it('should not transition for non existing events', () => {
        const machine = createMachine();

        let currentState = machine.dispatch({ name: 'invent' });
        expect(currentState.name).toBe('a');
        expect(currentState.data).toBe('A');
        expect(machine.currentState).toBe(currentState);
    });

    it('should allow to create machine without transitions', () => {
        const machine = new RawStateMachine({ name: 'a' });
        machine
            .addNode('a')
            .addTransition('a-to-b', 'b');
        machine
            .addNode('b')
            .addTransition('b-to-a', 'a');

        let currentState = machine.dispatch({ name: 'a-to-b' });
        expect(currentState.name).toBe('b');
        currentState = machine.dispatch({ name: 'b-to-a' });
        expect(currentState.name).toBe('a');
    })

});

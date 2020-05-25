# Awesome Finite State Machine

[![Build Status](https://travis-ci.org/juancarrey/awsm-fsm.svg?branch=master)](https://travis-ci.org/juancarrey/awsm-fsm)

This is a simple finite state machine built on Typescript

## Roadmap

 * Make state domain objects inmutable
* Create builders to construct a state machine easier
* Be able to start from an existing machine definition to extend it, creating a new state graph
* Machine state verification (All states are reachable, all transitions have origin/destination a valid state, etc)
* Add rxjs and create observables for state changes and transition triggering 

## Usage

Simply basic usage (v0.0.1)
```javascript

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

const machine = createMachine();
machine.dispatch({ name: 'a-to-b' });
machine.dispatch({ name: 'b-to-c' });
machine.dispatch({ name: 'c-to-b' });
machine.dispatch({ name: 'b-to-a' });
```
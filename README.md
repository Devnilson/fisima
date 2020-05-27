# Awesome Finite State Machine

[![Build Status](https://travis-ci.org/juancarrey/awsm-fsm.svg?branch=master)](https://travis-ci.org/juancarrey/awsm-fsm)

This is a simple finite state machine built on Typescript

## Roadmap

* Be able to start from an existing machine definition to extend it, creating a new state graph
* Machine state verification (All states are reachable, all transitions have origin/destination a valid state, etc)
* Hooks: On enter node, on exit node, on transition triggered, state change
* Attach rxjs to hooks

## Usage

Simply basic usage (v0.0.3)
```javascript

 const createMachine = () =>
      new RawStateMachineBuilder<string>('a', 'A')
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

const machine = createMachine();
machine.dispatch({ name: 'a-to-b' });
machine.dispatch({ name: 'b-to-c' });
machine.dispatch({ name: 'c-to-b' });
machine.dispatch({ name: 'b-to-a' });
```
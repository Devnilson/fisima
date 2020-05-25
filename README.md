# Awesome Finite State Machine

[![Build Status](https://travis-ci.org/juancarrey/awsm-fsm.svg?branch=master)](https://travis-ci.org/juancarrey/awsm-fsm)

This is a simple finite state machine built on Typescript

## Roadmap

 * Make state domain objects inmutable
* Create builders to construct a state machine easier
* Be able to start from an existing machine definition to extend it, creating a new state graph
* Machine state verification (All states are reachable, all transitions have origin/destination a valid state, etc)
* Add rxjs and create observables for state changes and transition triggering 

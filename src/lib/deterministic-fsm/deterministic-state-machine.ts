import { createDeterministicTransitions } from './deterministic-transition.fn';
import { DeterministicTransitions } from './deterministic-transition-map';
import { createDeterministicOutput } from './deterministic-output.fn';
import { MachineNode } from '../state-machine-api';
import { GenericStateMachine } from '../state-machine';

/**
 * In a deterministic automaton, every state has exactly one transition for each possible input.
 * In a non-deterministic automaton, an input can lead to one, more than one, or no transition for a given state.
 * This machine has no output (void) and only has state.
 */
export class DeterministicStateMachine extends GenericStateMachine<void> {
  constructor(initialState: MachineNode, finalNodes: Set<MachineNode>, transitions: DeterministicTransitions) {
    super(initialState, finalNodes, createDeterministicTransitions(transitions), createDeterministicOutput());
  }
}

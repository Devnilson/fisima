import { MachineNode } from '../state-machine-api';
import { GenericStateMachine } from '../state-machine';
import { MooreTransitionMap } from './moore-transition-map';
import { createMooreOutput } from './moore-output.fn';
import { MooreOutputMap } from './moore-output-map';
import { createMooreTransitions } from './moore-transition.fn';

/**
 * The FSM uses only entry actions, i.e., output depends only on state.
 */
export class MooreStateMachine<T> extends GenericStateMachine<T> {
  constructor(
    initialState: MachineNode,
    finalNodes: Set<MachineNode>,
    transitions: MooreTransitionMap,
    outputs: MooreOutputMap<T>,
  ) {
    super(initialState, finalNodes, createMooreTransitions(transitions), createMooreOutput<T>(outputs));
  }
}

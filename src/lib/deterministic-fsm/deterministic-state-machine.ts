import { createDeterministicTransitions } from './deterministic-transition.fn';
import { DeterministicTransitions } from './deterministic-transition-map';
import { createDeterministicOutput } from './deterministic-output.fn';
import { MachineNode } from '../state-machine-api';
import { GenericStateMachine } from '../state-machine';

export class DeterministicStateMachine extends GenericStateMachine<void> {
  constructor(initialState: MachineNode, finalNodes: Set<MachineNode>, transitions: DeterministicTransitions) {
    super(
      initialState,
      finalNodes,
      createDeterministicTransitions(transitions),
      createDeterministicOutput(transitions),
    );
  }
}

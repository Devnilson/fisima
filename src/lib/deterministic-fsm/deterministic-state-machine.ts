import { DeterministicTransitions, createDeterministicTransitions } from './deterministic-transition.fn';
import { MachineNode } from '../state-machine-api';
import { GenericStateMachine } from '../state-machine';

export class DeterministicStateMachine extends GenericStateMachine<void> {
  constructor(initialState: MachineNode, finalNodes: Set<MachineNode>, transitions: DeterministicTransitions) {
    super(initialState, finalNodes, createDeterministicTransitions(transitions));
  }
}

import { MachineEvent, MachineTransitionFn, MachineState, MachineNodeId } from '../state-machine-api';
import { DeterministicTransitions } from './deterministic-transition-map';

export const createDeterministicTransitions: (transitions: DeterministicTransitions) => MachineTransitionFn<void> = (
  transitions: DeterministicTransitions,
) => (currentState: MachineState<void>, $event: MachineEvent): MachineNodeId => {
  const node = transitions.get(currentState.currentNode.id);
  return node?.get($event);
};

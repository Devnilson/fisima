import { MachineEvent, MachineTransitionFn, MachineState, MachineNode } from '../state-machine-api';
import { DeterministicTransitions } from './deterministic-transition-map';

export const createDeterministicTransitions: (transitions: DeterministicTransitions) => MachineTransitionFn<void> = (
  transitions: DeterministicTransitions,
) => (currentState: MachineState<void>, $event: MachineEvent): MachineNode => {
  if (!transitions.has(currentState.currentNode)) {
    return currentState.currentNode;
  }

  const node = transitions.get(currentState.currentNode)!;
  if (!node.has($event)) {
    return currentState.currentNode;
  }

  return node.get($event)!;
};

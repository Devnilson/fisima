import { MachineEvent, MachineTransitionFn, MachineState, MachineNode } from '../state-machine-api';

export type DeterministicTransitions = Map<MachineNode, Map<MachineEvent, MachineNode>>;

export const deterministicTransitionFn: (transitions: DeterministicTransitions) => MachineTransitionFn<void> = (
  transitions: DeterministicTransitions,
) => (currentState: MachineState<void>, $event: MachineEvent): MachineState<void> => {
  if (!transitions.has(currentState.currentNode)) {
    return currentState;
  }

  const node = transitions.get(currentState.currentNode)!;
  if (!node.has($event)) {
    return currentState;
  }

  return {
    currentNode: node.get($event)!,
  };
};

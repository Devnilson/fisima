import { MachineEvent, MachineTransitionFn, MachineState, MachineNode } from '../state-machine-api';
import { MooreTransitionMap } from './moore-transition-map';

export const createMooreTransitions: <T>(transitions: MooreTransitionMap) => MachineTransitionFn<T> = <T>(
  transitions: MooreTransitionMap,
) => (currentState: MachineState<T>, $event: MachineEvent): MachineNode => {
  if (!transitions.has(currentState.currentNode)) {
    return currentState.currentNode;
  }

  const node = transitions.get(currentState.currentNode)!;
  if (!node.has($event)) {
    return currentState.currentNode;
  }

  return node.get($event)!;
};

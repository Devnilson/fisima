import { MachineEvent, MachineTransitionFn, MachineState, MachineNodeId } from '../state-machine-api';
import { MooreTransitionMap } from './moore-transition-map';

export const createMooreTransitions: <T>(transitions: MooreTransitionMap) => MachineTransitionFn<T> = <T>(
  transitions: MooreTransitionMap,
) => (currentState: MachineState<T>, $event: MachineEvent): MachineNodeId => {
  const node = transitions.get(currentState.currentNode.id)!;
  return node.get($event);
};

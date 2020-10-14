import { MachineEvent, MachineTransitionFn, MachineState, MachineNode } from '../state-machine-api';
import { MealyTransitionMap } from './mealy-transition-map';

export const createMealyTransitions: <T>(transitions: MealyTransitionMap<T>) => MachineTransitionFn<T> = <T>(
  transitions: MealyTransitionMap<T>,
) => (currentState: MachineState<T>, $event: MachineEvent): MachineNode => {
  if (!transitions.has(currentState.currentNode)) {
    return currentState.currentNode;
  }

  const node = transitions.get(currentState.currentNode)!;
  if (!node.has($event)) {
    return currentState.currentNode;
  }

  return node.get($event)?.node!;
};

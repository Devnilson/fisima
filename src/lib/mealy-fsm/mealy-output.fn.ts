import { MachineEvent, MachineOutputFn, MachineState } from '../state-machine-api';
import { MealyTransitionMap } from './mealy-transition-map';

export const createMealyOutput: <T>(transitions: MealyTransitionMap<T>) => MachineOutputFn<T> = <T>(
  transitions: MealyTransitionMap<T>,
) => (currentState: MachineState<T>, $event: MachineEvent): T => {
  if (!transitions.has(currentState.currentNode)) {
    return Object.create(null);
  }

  const node = transitions.get(currentState.currentNode)!;
  if (!node.has($event)) {
    return Object.create(null);
  }

  return node.get($event)?.output!;
};

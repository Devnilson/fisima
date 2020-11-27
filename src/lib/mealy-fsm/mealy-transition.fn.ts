import { MachineEvent, MachineTransitionFn, MachineState, MachineNode, MachineNodeId } from '../state-machine-api';
import { MealyTransitionMap } from './mealy-transition-map';

export const createMealyTransitions: <T>(transitions: MealyTransitionMap) => MachineTransitionFn<T> = <T>(
  transitions: MealyTransitionMap,
) => (currentState: MachineState<T>, $event: MachineEvent): MachineNodeId => {
  const node = transitions.get(currentState.currentNode.id);
  return node?.get($event);
};

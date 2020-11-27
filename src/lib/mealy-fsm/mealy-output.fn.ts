import { MachineEvent, MachineOutputFn, MachineState } from '../state-machine-api';
import { MealyOutputMap } from './mealy-output-map';

export const createMealyOutput: <T>(outputMap: MealyOutputMap<T>) => MachineOutputFn<T> = <T>(
  outputMap: MealyOutputMap<T>,
) => (currentState: MachineState<T>, $event: MachineEvent): T | undefined => {
  const node = outputMap.get(currentState.currentNode.id);
  return node?.get($event);
};

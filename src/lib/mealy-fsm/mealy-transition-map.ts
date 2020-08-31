import { MachineNode, MachineEvent } from '../state-machine-api';

export class MealyTransition<T> {
  constructor(public node: MachineNode, public output: T) {}
}

export type MealyTransitionMap<T> = Map<MachineNode, Map<MachineEvent, MealyTransition<T>>>;

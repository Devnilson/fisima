import { createMealyTransitions } from './mealy-transition.fn';
import { MealyTransitionMap } from './mealy-transition-map';
import { createMealyOutput } from './mealy-output.fn';
import { MachineNode } from '../state-machine-api';
import { GenericStateMachine } from '../state-machine';

export class MealyStateMachine<T> extends GenericStateMachine<T> {
  constructor(initialState: MachineNode, finalNodes: Set<MachineNode>, transitions: MealyTransitionMap<T>) {
    super(initialState, finalNodes, createMealyTransitions(transitions), createMealyOutput<T>(transitions));
  }
}

import { createMealyTransitions } from './mealy-transition.fn';
import { MealyTransitionMap } from './mealy-transition-map';
import { createMealyOutput } from './mealy-output.fn';
import { MachineNode } from '../state-machine-api';
import { GenericStateMachine } from '../state-machine';

/**
 * The FSM also uses input actions, i.e., output depends on input and state.
 * The use of a Mealy FSM leads often to a reduction of the number of states.
 */
export class MealyStateMachine<T> extends GenericStateMachine<T> {
  constructor(initialState: MachineNode, finalNodes: Set<MachineNode>, transitions: MealyTransitionMap<T>) {
    super(initialState, finalNodes, createMealyTransitions(transitions), createMealyOutput<T>(transitions));
  }
}

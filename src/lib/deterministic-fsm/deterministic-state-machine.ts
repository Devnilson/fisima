import { DeterministicTransitions, deterministicTransitionFn } from './deterministic-transition.fn';
import { StateMachine, MachineNode } from '../state-machine-api';
import { GenericStateMachine } from '../state-machine';

export const deterministicStateMachine: (
  initialState: MachineNode,
  finalNodes: Set<MachineNode>,
  transitions: DeterministicTransitions,
) => StateMachine<void> = (
  initialState: MachineNode,
  finalNodes: Set<MachineNode>,
  transitions: DeterministicTransitions,
) => new GenericStateMachine<void>(initialState, finalNodes, deterministicTransitionFn(transitions));

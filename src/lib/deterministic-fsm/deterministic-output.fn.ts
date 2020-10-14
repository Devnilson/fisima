import { MachineEvent, MachineTransitionFn, MachineState, MachineNode, MachineOutputFn } from '../state-machine-api';
import { DeterministicTransitions } from './deterministic-transition-map';

export const createDeterministicOutput: (transitions: DeterministicTransitions) => MachineOutputFn<void> = (
  transitions: DeterministicTransitions,
) => (currentState: MachineState<void>, $event: MachineEvent): void => {
  return;
};

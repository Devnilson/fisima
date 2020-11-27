import { MachineEvent, MachineTransitionFn, MachineState, MachineNode, MachineOutputFn } from '../state-machine-api';
import { DeterministicTransitions } from './deterministic-transition-map';

export const createDeterministicOutput: () => MachineOutputFn<void> = () => (): void => {
  return undefined;
};

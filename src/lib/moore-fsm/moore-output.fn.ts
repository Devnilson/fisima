import { MachineEvent, MachineNode, MachineOutputFn, MachineState } from '../state-machine-api';
import { MooreOutputMap } from './moore-output-map';

export const createMooreOutput: <T>(outputs: MooreOutputMap<T>) => MachineOutputFn<T> = <T>(
  outputs: MooreOutputMap<T>,
) => (currentState: MachineState<T>, $event: MachineEvent, nextNode: MachineNode): T | undefined => {
  if (!outputs.has(nextNode)) {
    return undefined;
  }

  return outputs.get(nextNode)!;
};

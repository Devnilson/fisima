import { MachineNode } from './machine-node';

export interface MachineState<TOutput> {
  currentNode: MachineNode;
  output?: TOutput;
}

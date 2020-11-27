import { MachineNode, MachineNodeId } from './machine-node';

export interface MachineState<T> {
  currentNode: MachineNode;
  output?: T;
}

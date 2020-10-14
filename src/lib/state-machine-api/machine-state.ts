import { MachineNode } from './machine-node';

export class MachineState<TOutput> {
  constructor(public currentNode: MachineNode, public output?: TOutput) {}
}

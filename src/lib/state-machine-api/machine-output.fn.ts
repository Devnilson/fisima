import { MachineEvent, MachineNode, MachineNodeId, MachineState } from '.';

export type MachineOutputFn<TOutput> = (
  currentState: MachineState<TOutput>,
  $event: MachineEvent,
  nextNode: MachineNode,
) => TOutput | undefined;

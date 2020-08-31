import { MachineEvent, MachineState, MachineNode } from '.';

export type MachineTransitionFn<TOutput> = (currentState: MachineState<TOutput>, $event: MachineEvent) => MachineNode;

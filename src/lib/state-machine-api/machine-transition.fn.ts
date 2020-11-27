import { MachineEvent, MachineState, MachineNodeId } from '.';

export type MachineTransitionFn<TOutput> = (currentState: MachineState<TOutput>, $event: MachineEvent) => MachineNodeId;

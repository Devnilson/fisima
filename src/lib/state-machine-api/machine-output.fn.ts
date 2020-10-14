import { MachineEvent, MachineState } from '.';

export type MachineOutputFn<TOutput> = (currentState: MachineState<TOutput>, $event: MachineEvent) => TOutput;

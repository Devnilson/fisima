import { MachineEvent, MachineState } from '.';

export type MachineTransitionFn<TOutput> = (
  currentState: MachineState<TOutput>,
  $event: MachineEvent,
) => MachineState<TOutput>;

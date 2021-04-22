import { MachineOutputFn } from '../state-machine-api';

export const noOpOutput: MachineOutputFn<void> = (): void => undefined;

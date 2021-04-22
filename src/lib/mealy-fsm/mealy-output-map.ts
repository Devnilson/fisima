import { MachineEvent, MachineNodeId } from '../state-machine-api';

export type MealyOutputMap<T> = Map<MachineNodeId, Map<MachineEvent, T>>;

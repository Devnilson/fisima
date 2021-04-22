import { MachineNodeId, MachineEvent } from '../state-machine-api';

export type MealyTransitionMap = Map<MachineNodeId, Map<MachineEvent, MachineNodeId>>;

import { MachineEvent, MachineNodeId } from '../state-machine-api';

export type DeterministicTransitions = Map<MachineNodeId, Map<MachineEvent, MachineNodeId>>;

import { MachineEvent, MachineNodeId } from '../state-machine-api';

export type MooreTransitionMap = Map<MachineNodeId, Map<MachineEvent, MachineNodeId>>;

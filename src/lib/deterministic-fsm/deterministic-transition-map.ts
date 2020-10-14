import { MachineEvent, MachineNode } from '../state-machine-api';

export type DeterministicTransitions = Map<MachineNode, Map<MachineEvent, MachineNode>>;

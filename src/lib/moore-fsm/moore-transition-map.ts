import { MachineNode, MachineEvent } from '../state-machine-api';

export type MooreTransitionMap = Map<MachineNode, Map<MachineEvent, MachineNode>>;

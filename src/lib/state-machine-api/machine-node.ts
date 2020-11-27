export interface MachineNode {
  id: string;
  final?: boolean;
}

export type MachineNodeId = (string & {}) | undefined;

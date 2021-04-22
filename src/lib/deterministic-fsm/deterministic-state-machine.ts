import { createDeterministicTransitions } from './deterministic-transition.fn';
import { DeterministicTransitions } from './deterministic-transition-map';
import { MachineEvent, MachineNode, MachineNodeId, MachineState } from '../state-machine-api';
import { GenericStateMachine } from '../state-machine';
import { noOpOutput } from '../state-machine/no-op-output.fn';

/**
 * In a deterministic automaton, every state has exactly one transition for each possible input.
 * In a non-deterministic automaton, an input can lead to one, more than one, or no transition for a given state.
 * This machine has no output (void) and only has state.
 */
class DeterministicStateMachine extends GenericStateMachine<void> {
  constructor(initialState: MachineState<void>, nodes: MachineNode[], transitions: DeterministicTransitions) {
    super(initialState, nodes, createDeterministicTransitions(transitions), noOpOutput);
  }
}

// Utility for easy-building
export interface DeterministicMachineDefinition {
  initialNode: MachineNodeId;
  nodes: DeterministicNode[];
}

export interface DeterministicNode {
  id: MachineNodeId;
  transitions: Map<MachineEvent, MachineNodeId>;
  final: boolean;
}

/**
 * Utility function to create a Mealy FSMm.
 * @param definition - The mealy machine definition (nodes, transitions and outputs)
 * Usage:
 * createDeterministicMachine({
 *   initialState: 'A',
 *   nodes: [
 *     {
 *       name: 'A',
 *       transitions: new Map([['1', 'B'], ['0', 'A']]),
 *       final: true
 *     },
 *     {
 *       name: 'B',
 *       transitions: new Map([['1', 'B'], ['0', 'A']]),
 *       final: false
 *     },
 * ]
 * });
 *
 */
export function createDeterministicMachine(definition: DeterministicMachineDefinition): DeterministicStateMachine {
  // TODO: Validate definition:
  // All nodes have defined transitions
  // InitialState is one of the nodes (!!currentNode)
  // All Transitions point to existing nodes
  // All nodes have transitions for every event type

  function createTransitions(): DeterministicTransitions {
    return new Map<MachineNodeId, Map<MachineEvent, MachineNodeId>>(
      definition.nodes.map((node) => [node.id, node.transitions]),
    );
  }

  const nodes = definition.nodes.map((node) => ({ id: node.id, final: node.final } as MachineNode));
  const currentNode = nodes.find((n) => n.id === definition.initialNode)!;
  const initialState: MachineState<void> = { currentNode };

  return new DeterministicStateMachine(initialState, nodes, createTransitions());
}

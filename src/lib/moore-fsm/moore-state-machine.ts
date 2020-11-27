import { MachineEvent, MachineNode, MachineNodeId, MachineState } from '../state-machine-api';
import { GenericStateMachine } from '../state-machine';
import { MooreTransitionMap } from './moore-transition-map';
import { createMooreOutput } from './moore-output.fn';
import { MooreOutputMap } from './moore-output-map';
import { createMooreTransitions } from './moore-transition.fn';

/**
 * The FSM uses only entry actions, i.e., output depends only on state.
 */
class MooreStateMachine<T> extends GenericStateMachine<T> {
  constructor(
    initialState: MachineState<T>,
    nodes: MachineNode[],
    transitions: MooreTransitionMap,
    outputs: MooreOutputMap<T>,
  ) {
    super(initialState, nodes, createMooreTransitions(transitions), createMooreOutput<T>(outputs));
  }
}

// Utility for easy-building
export interface MooreMachineDefinition<T> {
  initialNode: MachineNodeId;
  nodes: MooreNode<T>[];
}

export interface MooreNode<T> {
  id: MachineNodeId;
  transitions: Map<MachineEvent, MachineNodeId>;
  output: T;
  final: boolean;
}

/**
 * Utility function to create a Moore FSMm.
 * @param definition - The moore machine definition (nodes, transitions and outputs)
 * Usage:
 * createMooreStateMachine({
 *   initialState: 'A',
 *   nodes: [
 *     {
 *       name: 'A',
 *       transitions: new Map([['1', 'B'], ['0', 'A']]),
 *       output: 'OutputA',
 *       final: true
 *     },
 *     {
 *       name: 'B',
 *       transitions: new Map([['0', 'B'], ['1', 'A']]),
 *       output: 'OutputB',
 *       final: true
 *     },
 * ]
 * });
 *
 */
export function createMooreStateMachine<T>(definition: MooreMachineDefinition<T>): MooreStateMachine<T> {
  // TODO: Validate definition:
  // All nodes have defined transitions
  // InitialState is one of the nodes (!!currentNode)
  // All Transitions point to existing nodes

  function createTransitions(): MooreTransitionMap {
    return new Map<MachineNodeId, Map<MachineEvent, MachineNodeId>>(
      definition.nodes.map((node) => [node.id, node.transitions]),
    );
  }

  function createOutputs(): MooreOutputMap<T> {
    return new Map<MachineNodeId, T>(definition.nodes.map((node) => [node.id, node.output]));
  }

  const nodes = definition.nodes.map((node) => ({ id: node.id, final: node.final } as MachineNode));
  const output = definition.nodes.find((node) => node.id === definition.initialNode)!.output;
  const currentNode = nodes.find((n) => n.id === definition.initialNode)!;
  const initialState: MachineState<T> = { currentNode, output };

  return new MooreStateMachine<T>(initialState, nodes, createTransitions(), createOutputs());
}

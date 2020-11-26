import { MachineEvent, MachineNode } from '../state-machine-api';
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
    initialState: MachineNode,
    finalNodes: Set<MachineNode>,
    transitions: MooreTransitionMap,
    outputs: MooreOutputMap<T>,
  ) {
    super(initialState, finalNodes, createMooreTransitions(transitions), createMooreOutput<T>(outputs));
  }
}

// Utility for easy-building
export interface MooreMachineDefinition<T> {
  initialState: MachineNode;
  nodes: MooreNode<T>[];
}

export interface MooreNode<T> {
  name: MachineNode;
  transitions: Map<MachineEvent, MachineNode>;
  output: T;
  final: boolean;
}

/**
 * Utility function to create a Moore FSM
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
  function createTransitions(): MooreTransitionMap {
    return new Map<MachineNode, Map<MachineEvent, MachineNode>>(
      definition.nodes.map((node) => [node.name, node.transitions]),
    );
  }

  function createOutputs(): MooreOutputMap<T> {
    return new Map<MachineNode, T>(definition.nodes.map((node) => [node.name, node.output]));
  }

  return new MooreStateMachine<T>(
    definition.initialState,
    new Set<MachineNode>(definition.nodes.filter((n) => n.final).map((n) => n.name)),
    createTransitions(),
    createOutputs(),
  );
}

import { createMealyTransitions } from './mealy-transition.fn';
import { MealyTransitionMap } from './mealy-transition-map';
import { createMealyOutput } from './mealy-output.fn';
import { MachineEvent, MachineNode, MachineNodeId, MachineState } from '../state-machine-api';
import { GenericStateMachine } from '../state-machine';
import { MealyOutputMap } from './mealy-output-map';

/**
 * The FSM also uses input actions, i.e., output depends on input and state.
 * The use of a Mealy FSM leads often to a reduction of the number of states.
 */
class MealyStateMachine<T> extends GenericStateMachine<T> {
  constructor(
    initialState: MachineState<T>,
    nodes: MachineNode[],
    transitions: MealyTransitionMap,
    outputs: MealyOutputMap<T>,
  ) {
    super(initialState, nodes, createMealyTransitions(transitions), createMealyOutput<T>(outputs));
  }
}

// Utility for easy-building
export interface MealyMachineDefinition<T> {
  initialNode: MachineNodeId;
  nodes: MealyNode<T>[];
}

export interface MealyNode<T> {
  id: MachineNodeId;
  transitions: Map<MachineEvent, MealyTransition<T>>;
  final: boolean;
}

export interface MealyTransition<T> {
  node: MachineNodeId;
  output: T;
}

/**
 * Utility function to create a Mealy FSMm.
 * @param definition - The mealy machine definition (nodes, transitions and outputs)
 * Usage:
 * createMealyStateMachine({
 *   initialState: 'A',
 *   nodes: [
 *     {
 *       name: 'A',
 *       transitions: new Map([['1', { 'B', 'A-to-B' }], ['0', { 'A', 'A-to-A' }]]),
 *       final: true
 *     },
 *     {
 *       name: 'B',
 *       transitions: new Map([['1', { 'B', 'B-to-B' }], ['0', { 'A', 'B-to-A' }]]),
 *       final: false
 *     },
 * ]
 * });
 *
 */
export function createMealyStateMachine<T>(definition: MealyMachineDefinition<T>): MealyStateMachine<T> {
  // TODO: Validate definition:
  // All nodes have defined transitions
  // InitialState is one of the nodes (!!currentNode)
  // All Transitions point to existing nodes

  function createNodeTransition(node: MealyNode<T>) {
    return new Map<MachineEvent, MachineNodeId>(
      Array.from(node.transitions).map(([key, transition]) => [key, transition.node]),
    );
  }

  function createTransitions(): MealyTransitionMap {
    return new Map<MachineNodeId, Map<MachineEvent, MachineNodeId>>(
      definition.nodes.map((node) => [node.id, createNodeTransition(node)]),
    );
  }

  function createNodeOutputs(node: MealyNode<T>) {
    return new Map<MachineEvent, T>(Array.from(node.transitions).map(([key, transition]) => [key, transition.output]));
  }

  function createOutputs(): MealyOutputMap<T> {
    return new Map<MachineNodeId, Map<MachineEvent, T>>(
      definition.nodes.map((node) => [node.id, createNodeOutputs(node)]),
    );
  }

  const nodes = definition.nodes.map((node) => ({ id: node.id, final: node.final } as MachineNode));
  const currentNode = nodes.find((n) => n.id === definition.initialNode)!;
  const initialState: MachineState<T> = { currentNode };

  return new MealyStateMachine<T>(initialState, nodes, createTransitions(), createOutputs());
}

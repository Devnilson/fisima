import {Node, RawNode} from "./node";
import {Event} from "./event";
import {State} from "./state";

export interface StateMachine<T> {
    dispatch($event: Event): State<T>;
}

export class StateMachine<T> implements StateMachine<T> {

    private _states: Map<string, Node<T>>;
    private _initialState: State<T>;
    private _currentState: State<T>;

    constructor(initialState: State<T>) {
        this._states = new Map<string, Node<T>>();
        this._initialState = initialState;
        this._currentState = initialState;
    }

    public addNode(stateName: string): RawNode<T> | never {
        if (this._states.has(stateName)) throw new Error(`Duplicate state ${stateName}`);
        const node = new RawNode<T>(stateName);
        this._states.set(stateName, node);
        return node;
    }

    public dispatch(event: Event): State<T> | never {
        if (!this._states.has(this._currentState.name))
            throw new Error(`We arrived to unkown state ${this._currentState.name}`);

        const currentState = this._states.get(this._currentState.name) as Node<T>;
        // @ts-ignore We have already checked there is such state
        this._currentState = currentState.dispatch(event, this._currentState);

        if (!this._states.has(this._currentState.name))
            throw new Error(`Invalid state resulted on transition - No Such State ${this._currentState.name}`);

        // @ts-ignore We have already checked that it is not undefined
        return this._currentState;
    }

    public get currentState(): State<T> {
        return this._currentState;
    }
}

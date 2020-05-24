import {StateData} from "./state-data";
import {Event} from "./event";
import {noopTransitionTrigger, RawMachineTransition, Transition, TransitionAction} from "./raw-transition";

export interface Node<T> {
    dispatch($event: Event, currentState: StateData<T>): StateData<T>;
}

export class RawNode<T> implements Node<T> {
    private name: string;
    private transitions: Map<string, Transition<T>>;

    constructor(name: string) {
        this.name = name;
        this.transitions = new Map<string, Transition<T>>();
    }

    public addTransition(
        eventName: string,
        nextState: string,
        onTransitionTrigger: TransitionAction<T> = noopTransitionTrigger
    ): RawNode<T>   {
        this.transitions.set(eventName, new RawMachineTransition(this.name, nextState, onTransitionTrigger));
        return this;
    }

    public dispatch($event: Event, currentState: StateData<T>): StateData<T> {
        if (!this.transitions.has($event.name)) {
            return currentState;
        }

        const transition = this.transitions.get($event.name);
        // @ts-ignore Already checked
        return transition.trigger(currentState, $event.payload);
    }

}

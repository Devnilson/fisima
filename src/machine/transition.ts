import {State} from "./state";

export interface Transition<T> {
    trigger(currentState: State<T>, $event: any): State<T>;
}

export class RawMachineTransition<T> implements Transition<T> {
    private originState: string;
    private nextState: string;
    private onTrigger: (current: T) => T;

    constructor(originState: string, nextState: string, onTransitionTrigger: (current: T) => T) {
        this.originState = originState;
        this.nextState = nextState;
        this.onTrigger = onTransitionTrigger;
    }

    trigger(currentState: State<T>, $event: any): State<T> {
        const data : T = this.onTrigger
            ? this.onTrigger(currentState.data)
            : currentState.data;
        return { name: this.nextState, data };
    }

}

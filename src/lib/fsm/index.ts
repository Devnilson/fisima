export default class fsm {
  private currentState: string;
  private states: { [id: string]: { [id: string]: string } } = {};

  constructor(initialState: string, transitions: Array<transition>) {
    this.currentState = initialState;

    transitions.forEach((transition) => this.addTransition(transition));
  }

  public CurrentState(): string {
    get: {
      return this.currentState;
    }
  }

  public handle(message: string) {
    if (this.states[this.currentState] != undefined) {
      var target = this.states[this.currentState][message];

      if (target != undefined) {
        this.currentState = target;
      }
    }
  }

  public static Transition(fromState: string, message: string, toState: string): transition {
    return new transition(fromState, message, toState);
  }

  private addTransition(transition: transition) {
    let fromState = transition.fromState;
    let message = transition.message;
    let toState = transition.toState;

    if (this.states[fromState] == undefined) {
      this.states[fromState] = {};
    }

    this.states[fromState][message] = toState;
  }
}

class transition {
  constructor(fromState: string, message: string, toState: string) {
    this.fromState = fromState;
    this.message = message;
    this.toState = toState;
  }

  public fromState: string;
  public message: string;
  public toState: string;
}

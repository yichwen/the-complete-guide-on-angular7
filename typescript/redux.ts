// actions which instruct the reducer on how to generate a new state.
// But often changes in our app can’t be described by a single value - instead we need parameters to describe the change
// This is why we have the payload field in our Action
interface Action {
  type: string;
  payload?: any;
}

let incrementAction: Action = { type: 'INCREMENT' }
let decrementAction: Action = { type: 'DECREMENT' }
let plusAction: Action = { type: 'PLUS', payload: 9 };

interface Reducer<T> {
  (state: T , action: Action) : T
}

let reducer: Reducer<number> = (state: number, action: Action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    case 'PLUS': return state + action.payload;
    default: return state;
  }
}

// console.log(reducer(0, incrementAction));
// console.log(reducer(1, incrementAction));
// console.log(reducer(100, decrementAction));
// console.log(reducer(100, { type: 'UNKNOWN' }));
// console.log(reducer(100, plusAction));


// In Redux, we generally have 1 store and 1 top-level reducer per application.
class Store<T> {

  private _state: T;
  private _listeners: ListenerCallback[] = [];

  // given reducer and initial state
  constructor(private reducer: Reducer<T>, initialState: T) {
    this._state = initialState;
  }

  // get state
  getState(): T {
    return this._state;
  }

  // perform action
  dispatch(action: Action): void {
    this._state = this.reducer(this._state, action);
    this._listeners.forEach((listener: ListenerCallback) => listener());
  }

  subscribe(listener: ListenerCallback): UnsubscribeCallback {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter(l => l !== listener);
    };
  }

}

let store = new Store<number>(reducer, 0);
console.log(store.getState());

let unsubscribe = store.subscribe(() => {
  console.log('subscribed: ', store.getState());
})

store.dispatch(incrementAction);

store.dispatch(incrementAction);
unsubscribe();
store.dispatch(decrementAction);


interface ListenerCallback {
  (): void
}

interface UnsubscribeCallback {
  (): void
}


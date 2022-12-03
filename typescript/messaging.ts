interface Action {
  type: string;
  // payload?: any;
}

interface AddMessageAction extends Action {
  message: string;
}

interface DeleteMessageAction extends Action {
  index: number;
}

class MessageActions {
  static addMessage(message: string): AddMessageAction {
    return {
      type: 'ADD_MESSAGE',
      message: message
    };
  }
  static deleteMessage(index: number): DeleteMessageAction {
    return {
      type: 'DELETE_MESSAGE',
      index: index
    };
  }
}

interface Reducer<T> {
  (state: T , action: Action) : T
}

interface AppState {
  messages: string[];
}

class Store<T> {

  private _state: T;

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
  }

}

let messageReducer: Reducer<AppState> = (state: AppState, action: Action) => {
  switch(action.type) {
    case 'ADD_MESSAGE': 
      return {
        messages: state.messages.concat((<AddMessageAction>action).message)
      };
    case 'DELETE_MESSAGE':
      let idx = (<DeleteMessageAction>action).index;
      return {
        messages: [
          ...state.messages.slice(0, idx),
          ...state.messages.slice(idx + 1, state.messages.length)
        ]
      };
    default: return state;
  }
};

let messageStore = new Store<AppState>(messageReducer, { messages: [] });
console.log(messageStore.getState());

// messageStore.dispatch({
//   type: 'ADD_MESSAGE',
//   message: 'Would you say the fringe was made of silk?'
// } as AddMessageAction);

messageStore.dispatch(MessageActions.addMessage('Would you say the fringe was made of silk?'));

// messageStore.dispatch({
//   type: 'ADD_MESSAGE',
//   message: 'Wouldnt have no other kind but silk'
// } as AddMessageAction);

messageStore.dispatch(MessageActions.addMessage('Wouldnt have no other kind but silk'));

// messageStore.dispatch({
//   type: 'ADD_MESSAGE',
//   message: 'Has it really got a team of snow white horses?'
// } as AddMessageAction);

messageStore.dispatch(MessageActions.addMessage('Has it really got a team of snow white horses?'));

console.log(messageStore.getState());
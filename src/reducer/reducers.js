import * as types from "../action/types";

const initialState = {
  todos: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] };
    case types.EDIT_TODO:
      const updatedTodos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload.updatedTodo : todo
      );
      return { ...state, todos: updatedTodos };
    case types.DELETE_TODO:
      const filteredTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return { ...state, todos: filteredTodos };
    case types.LOAD_TODOS:
      return { ...state, todos: action.payload };
    case types.TOGGLE_LOADING:
      return { ...state, isLoading: !state.isLoading };
    default:
      return state;
  }
};

export default reducer;

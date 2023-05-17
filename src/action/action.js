import {
  ADD_TODO,
  EDIT_TODO,
  DELETE_TODO,
  LOAD_TODOS,
  TOGGLE_LOADING,
  DELETE_ALL_TODOS,
} from "./types";

const apiUrl = "https://6437aabe0c58d3b1457604ad.mockapi.io/api/v1/products";

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: {
    ...todo,
    id: Date.now(),
  },
});

export const editTodo = (id, updatedTodo) => ({
  type: EDIT_TODO,
  payload: { id, updatedTodo },
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

export const loadTodos = (todos) => ({
  type: LOAD_TODOS,
  payload: todos,
});

export const toggleLoading = () => ({
  type: TOGGLE_LOADING,
});

export const deleteAllTodos = () => ({
  type: DELETE_ALL_TODOS,
});

export const fetchTodos = () => {
  return (dispatch) => {
    dispatch(toggleLoading());
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        dispatch(loadTodos(data));
        dispatch(toggleLoading());
      })
      .catch((error) => console.log(error));
  };
};

export const createTodo = (todo) => {
  return (dispatch) => {
    return fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => dispatch(addTodo(data)))
      .catch((error) => console.log(error));
  };
};

export const updateTodo = (id, updatedTodo) => {
  return (dispatch) => {
    return fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedTodo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => dispatch(editTodo(id, updatedTodo)))
      .catch((error) => console.log(error));
  };
};

export const removeTodo = (id) => {
  return (dispatch) => {
    return fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    })
      .then(() => dispatch(deleteTodo(id)))
      .catch((error) => console.log(error));
  };
};

import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import TodoList from "./components/TodoList";
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <TodoList />
  </Provider>
);

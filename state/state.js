import { atom, selector, selectorFamily } from "recoil";

export const todoListState = atom({
  key: "todoListState",
  default: [],
});

export const filterState = atom({
  key: "filterState",
  default: "All",
});

export const filteredTodoListState = selector({
  key: "filteredTodoListState",
  get: ({ get }) => {
    const filter = get(filterState);
    const list = get(todoListState);

    switch (filter) {
      case "Completed":
        return list.filter(item => item.fields.completed);
      case "Uncompleted":
        return list.filter(item => !item.fields.completed);
      default:
        return [...list].sort((a, b) => a.fields.completed - b.fields.completed);
    }
  },
});

export const todoListStatsState = selector({
  key: "todoListStatsState",
  get: ({ get }) => {
    const todos = get(todoListState);
    const total = todos.length;
    const completed = todos.filter(todo => todo.fields.completed).length;
    const active = total - completed;
    return { total, completed, active };
  },
});

export const addTodo = selector({
  key: "addTodo",
  get: ({ get }) => get(todoListState),
  set: ({ get, set }, newTodo) => {
    set(todoListState, prevState => [...prevState, newTodo]);
  },
});

export const deleteTodo = selectorFamily({
  key: "deleteTodo",
  get: ({ get }) => get(todoListState),
  set:
    id =>
    ({ get, set }, newTodo) => {
      const newTodos = get(todoListState).filter(todo => todo.id !== id);
      set(todoListState, newTodos);
    },
});

export const updateTodo = selectorFamily({
  key: "updateTodo",
  get:
    id =>
    ({ get }) =>
      get(todoListState).findIndex(predicate => predicate.id === id),
  set:
    id =>
    ({ get, set }, newValue) => {
      const state = get(todoListState);
      const updatedTodo = state.map(todo =>
        todo.id === id ? { id, fields: { description: newValue, completed: todo.fields.completed } } : todo
      );
      set(todoListState, updatedTodo);
    },
});

export const toggleTodo = selectorFamily({
  key: "toggleTodo",
  get:
    id =>
    ({ get }) =>
      get(todoListState).findIndex(predicate => predicate.id === id),
  set:
    id =>
    ({ get, set }, newValue) => {
      const state = get(todoListState);
      const updateTodos = state.map(todo =>
        todo.id === id
          ? { id, fields: { description: todo.fields.description, completed: !todo.fields.completed } }
          : todo
      );
      set(todoListState, updateTodos);
    },
});

import { CREATE_TODO_START, CREATE_TODO_FULFILLED, CREATE_TODO_REJECTED } from "./../actions/TodoActions";
import { GET_TODOS_START, GET_TODOS_FULFILLED, GET_TODOS_REJECTED } from "./../actions/TodoActions";
import { SET_TODO_FOR_DELETE, UNSET_TODO_FOR_DELETE } from "./../actions/TodoActions";
import { DELETE_TODO_START, DELETE_TODO_FULFILLED, DELETE_TODO_REJECTED } from "./../actions/TodoActions";
import { SET_TODO_FOR_EDIT, UNSET_TODO_FOR_EDIT } from "./../actions/TodoActions";
import { UPDATE_TODO_START, UPDATE_TODO_FULFILLED, UPDATE_TODO_REJECTED } from "./../actions/TodoActions";

const initialState = {
    todos: null,
    isFetching: false,
    error: null,
    deleteTodo: null,
    editTodo: null
}
export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_TODO_START: {
            return { ...state };
        }
        case CREATE_TODO_FULFILLED: {
            const todos = action.payload;
            return { ...state, isFetching: false, error: null };
        }
        case CREATE_TODO_REJECTED: {
            const error = action.payload;
            return { ...state, isFetching: false, error: error };
        }
        case GET_TODOS_START: {
            return { ...state, isFetching: true };
        }
        case GET_TODOS_FULFILLED: {
            const todos = action.payload;
            return { ...state, isFetching: false, todos: todos, error: null };
        }
        case GET_TODOS_REJECTED: {
            const error = action.payload;
            return { ...state, isFetching: false, error: error };
        }
        case SET_TODO_FOR_DELETE: {
            return { ...state, deleteTodo: action.payload }
        }
        case UNSET_TODO_FOR_DELETE: {
            return { ...state, deleteTodo: null }
        }
        case DELETE_TODO_START: {
            return { ...state };
        }
        case DELETE_TODO_FULFILLED: {
            const deletedTodo = action.payload;
            let newTodos = state.todos.filter((todo) => {
                return todo.id !== deletedTodo.id;
            })
            return { ...state, todos: newTodos, error: null };
        }
        case DELETE_TODO_REJECTED: {
            const error = action.payload;
            return { ...state, error: error };
        }
        case SET_TODO_FOR_EDIT: {
            return { ...state, editTodo: action.payload }
        }
        case UNSET_TODO_FOR_EDIT: {
            return { ...state, editTodo: null }
        }
        case UPDATE_TODO_START: {
            return { ...state };
        }
        case UPDATE_TODO_FULFILLED: {
            const updatedTodo = action.payload;
            let newTodos = state.todos.map((todo) => {
                if (todo.id === updatedTodo.id) {
                    todo = updatedTodo;
                }
                return todo;
            })
            return { ...state, todos: newTodos, error: null };
        }
        case UPDATE_TODO_REJECTED: {
            const error = action.payload;
            return { ...state, error: error };
        }
        default: {
            return state;
        }
    }
}
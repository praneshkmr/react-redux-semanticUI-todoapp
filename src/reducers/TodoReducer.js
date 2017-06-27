import { CREATE_TODO_START, CREATE_TODO_FULFILLED, CREATE_TODO_REJECTED } from "./../actions/TodoActions";
import { GET_TODOS_START, GET_TODOS_FULFILLED, GET_TODOS_REJECTED } from "./../actions/TodoActions";

const initialState = {
    todos: null,
    isFetching: false,
    error: null
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
        default: {
            return state;
        }
    }
}
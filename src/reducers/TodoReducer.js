import { CREATE_TODO_START, CREATE_TODO_FULFILLED, CREATE_TODO_REJECTED } from "./../actions/TodoActions";

const initialState = {
    todos: null,
    isFetching: false,
    error: null
}
export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_TODO_START: {
            return { ...state, isFetching: true };
        }
        case CREATE_TODO_FULFILLED: {
            const todos = action.payload;
            return { ...state, isFetching: false, todos: todos, error: null };
        }
        case CREATE_TODO_REJECTED: {
            const error = action.payload;
            return { ...state, isFetching: false, error: error };
        }
    }
    return state;
}
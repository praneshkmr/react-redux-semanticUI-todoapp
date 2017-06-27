import axios from "axios";

export const CREATE_TODO_START = "CREATE_TODO_START";
export const CREATE_TODO_FULFILLED = "CREATE_TODO_FULFILLED";
export const CREATE_TODO_REJECTED = "CREATE_TODO_REJECTED";

const WS_BASE_URL = "http://rest.learncode.academy/api/praneshkmr/todos/";

export function createTodo(name) {
    return function (dispatch) {
        dispatch({ type: CREATE_TODO_START });
        return axios.post(WS_BASE_URL, { name: name, isComplete: false })
            .then(function (response) {
                var todos = response.data;
                dispatch({ type: CREATE_TODO_FULFILLED, payload: todos });
            })
    }
}
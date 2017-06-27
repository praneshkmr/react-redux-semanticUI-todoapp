import axios from "axios";

export const CREATE_TODO_START = "CREATE_TODO_START";
export const CREATE_TODO_FULFILLED = "CREATE_TODO_FULFILLED";
export const CREATE_TODO_REJECTED = "CREATE_TODO_REJECTED";

export const GET_TODOS_START = "GET_TODOS_START";
export const GET_TODOS_FULFILLED = "GET_TODOS_FULFILLED";
export const GET_TODOS_REJECTED = "GET_TODOS_REJECTED";

export const SET_TODO_FOR_DELETE = "SET_TODO_FOR_DELETE";
export const UNSET_TODO_FOR_DELETE = "UNSET_TODO_FOR_DELETE";

const WS_BASE_URL = "http://rest.learncode.academy/api/praneshkmr/todos/";

export function createTodo(name) {
    return function (dispatch) {
        dispatch({ type: CREATE_TODO_START });
        return axios.post(WS_BASE_URL, { name: name, isComplete: false })
            .then(function (response) {
                var todos = response.data;
                dispatch({ type: CREATE_TODO_FULFILLED, payload: todos });
            })
            .catch(function (error) {
                dispatch({ type: CREATE_TODO_REJECTED, payload: error });
            })
    }
}

export function getTodos() {
    return function (dispatch) {
        dispatch({ type: GET_TODOS_START });
        return axios.get(WS_BASE_URL)
            .then(function (response) {
                var todos = response.data;
                dispatch({ type: GET_TODOS_FULFILLED, payload: todos });
            })
            .catch(function (error) {
                dispatch({ type: GET_TODOS_REJECTED, payload: error });
            });
    }
}

export function setTodoForDelete(todo) {
    return function (dispatch) {
        dispatch({ type: SET_TODO_FOR_DELETE, payload: todo });
    }
}

export function unsetTodoForDelete() {
    return function (dispatch) {
        dispatch({ type: UNSET_TODO_FOR_DELETE });
    }
}
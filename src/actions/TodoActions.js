import axios from "axios";

export const CREATE_TODO_START = "CREATE_TODO_START";
export const CREATE_TODO_FULFILLED = "CREATE_TODO_FULFILLED";
export const CREATE_TODO_REJECTED = "CREATE_TODO_REJECTED";

export const GET_TODOS_START = "GET_TODOS_START";
export const GET_TODOS_FULFILLED = "GET_TODOS_FULFILLED";
export const GET_TODOS_REJECTED = "GET_TODOS_REJECTED";

export const SET_TODO_FOR_DELETE = "SET_TODO_FOR_DELETE";
export const UNSET_TODO_FOR_DELETE = "UNSET_TODO_FOR_DELETE";

export const DELETE_TODO_START = "DELETE_TODO_START";
export const DELETE_TODO_FULFILLED = "DELETE_TODO_FULFILLED";
export const DELETE_TODO_REJECTED = "DELETE_TODO_REJECTED";

export const SET_TODO_FOR_EDIT = "SET_TODO_FOR_EDIT";
export const UNSET_TODO_FOR_EDIT = "UNSET_TODO_FOR_EDIT";

export const UPDATE_TODO_START = "UPDATE_TODO_START";
export const UPDATE_TODO_FULFILLED = "UPDATE_TODO_FULFILLED";
export const UPDATE_TODO_REJECTED = "UPDATE_TODO_REJECTED";

const WS_BASE_URL = "http://rest.learncode.academy/api/praneshkmr/todos/";

export function createTodo(name) {
    return function (dispatch) {
        dispatch({ type: CREATE_TODO_START });
        return axios.post(WS_BASE_URL, { name: name, isComplete: false })
            .then(function (response) {
                var todo = response.data;
                dispatch({ type: CREATE_TODO_FULFILLED, payload: todo });
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

export function deleteTodo(todo) {
    return function (dispatch) {
        dispatch({ type: DELETE_TODO_START });
        return axios.delete(WS_BASE_URL + todo.id)
            .then(function (response) {
                dispatch({ type: DELETE_TODO_FULFILLED, payload: todo });
                dispatch({ type: UNSET_TODO_FOR_DELETE });
            })
            .catch(function (error) {
                dispatch({ type: DELETE_TODO_REJECTED, payload: error });
            })
    }
}

export function setTodoForEdit(todo) {
    return function (dispatch) {
        dispatch({ type: SET_TODO_FOR_EDIT, payload: todo });
    }
}

export function unsetTodoForEdit() {
    return function (dispatch) {
        dispatch({ type: UNSET_TODO_FOR_EDIT });
    }
}

export function updateTodo(todo) {
    return function (dispatch) {
        dispatch({ type: UPDATE_TODO_START });
        return axios.put(WS_BASE_URL + todo.id, todo)
            .then(function (response) {
                dispatch({ type: UPDATE_TODO_FULFILLED, payload: todo });
                dispatch({ type: UNSET_TODO_FOR_EDIT });
            })
            .catch(function (error) {
                dispatch({ type: UPDATE_TODO_REJECTED, payload: error });
            })
    }
}

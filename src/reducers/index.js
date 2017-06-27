import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import TodoReducer from "./TodoReducer";

export default combineReducers({
    todo: TodoReducer,
    form: formReducer
});
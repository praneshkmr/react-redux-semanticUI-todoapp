import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import reducers from "./reducers";

const store = createStore(reducers);

import Main from "./Main";

render(
    <Provider store={store}>
        <Main />
    </Provider>
    , document.getElementById("app"));
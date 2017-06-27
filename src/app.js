import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import reducers from "./reducers";

const logger = createLogger();
const store = createStore(reducers, applyMiddleware(thunk, logger));

import Main from "./Main";

render(
    <Provider store={store}>
        <Main />
    </Provider>
    , document.getElementById("app"));
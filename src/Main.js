import React, { Component } from "react";
import { render } from "react-dom";

import TodoForm from "./containers/TodoForm";
import TodosList from "./containers/TodosList";

export default class Main extends Component {
    render() {
        return (
            <div>
                <TodoForm />
                <TodosList />
            </div>
        )
    }
}
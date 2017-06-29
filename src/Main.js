import React, { Component } from "react";
import { render } from "react-dom";
import { Container } from 'semantic-ui-react'

import TodoForm from "./containers/TodoForm";
import TodosList from "./containers/TodosList";

export default class Main extends Component {
    render() {
        return (
            <Container>
                <TodoForm />
                <TodosList />
            </Container>
        )
    }
}
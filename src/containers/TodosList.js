import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Header, List } from "semantic-ui-react";

import { getTodos } from "./../actions/TodoActions";

class TodosList extends Component {
    componentWillMount() {
        this.props.dispatch(getTodos());
    }
    todoListItems(todo) {
        return (
            <List.Item key={todo.id}>
                <List.Content>
                    <List.Header>{todo.name}</List.Header>
                </List.Content>
            </ List.Item>
        )
    }
    render() {
        let content = null
        if (this.props.todo.todos) {
            content = (<List animated verticalAlign='middle'>
                {
                    this.props.todo.todos.map((todo) => {
                        return this.todoListItems(todo);
                    })
                }
            </List>
            )
        }
        else {
            content = <Header as="h4">No Todos Found. Please Add some</Header>
        }
        return (
            <Segment textAlign="center" loading={this.props.todo.isFetching}>
                <Header as="h2">Todo List</Header>
                {content}
            </Segment>
        )
    }
}
function mapStatesToProps(state) {
    return {
        todo: state.todo
    }
}
export default connect(mapStatesToProps)(TodosList);
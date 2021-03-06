import React, { Component } from "react";
import { connect } from "react-redux";
import { Segment, Header, List, Icon, Modal, Button, Checkbox } from "semantic-ui-react";

import { getTodos, setTodoForDelete, unsetTodoForDelete, deleteTodo, setTodoForEdit, updateTodo } from "./../actions/TodoActions";

class TodosList extends Component {
    componentWillMount() {
        this.props.dispatch(getTodos());
    }
    deleteTodo(todo) {
        this.props.dispatch(setTodoForDelete(todo));
    }
    closeDeleteModal() {
        this.props.dispatch(unsetTodoForDelete());
    }
    confirmDeleteTodo() {
        this.props.dispatch(deleteTodo(this.props.todo.deleteTodo));
    }
    editTodo(todo) {
        this.props.dispatch(setTodoForEdit(todo));
    }
    onToggleChange(todo) {
        todo.isComplete = !todo.isComplete;
        this.props.dispatch(updateTodo(todo));
    }
    todoListItems(todo) {
        return (
            <List.Item key={todo.id}>
                <List.Content>
                    <List.Header>{todo.name}</List.Header>
                </List.Content>
                <List.Content floated='right'>
                    <Icon link name='delete' onClick={this.deleteTodo.bind(this, todo)} />
                </List.Content>
                <List.Content floated='right'>
                    <Icon link name='edit' onClick={this.editTodo.bind(this, todo)} />
                </List.Content>
                <List.Content floated='right'>
                    <Checkbox toggle checked={todo.isComplete} onChange={this.onToggleChange.bind(this, todo)} />
                </List.Content>
            </ List.Item>
        )
    }
    render() {
        let content = null
        if (this.props.todo.todos) {
            content = (
                <List animated verticalAlign='middle'>
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
            <Segment loading={this.props.todo.isFetching}>
                <Header as="h2" textAlign="center">Todo List</Header>
                {content}
                <Modal
                    open={!!this.props.todo.deleteTodo}
                    basic
                    size='small'
                >
                    <Header icon='delete' content='Delete Todo' />
                    <Modal.Content>
                        <h3>Are you Sure, you want to Delete Todo : {this.props.todo.deleteTodo ? this.props.todo.deleteTodo.name : ""}?</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' onClick={this.closeDeleteModal.bind(this)} inverted>
                            <Icon name='remove' /> No
                        </Button>
                        <Button basic color='green' onClick={this.confirmDeleteTodo.bind(this)} inverted>
                            <Icon name='checkmark' /> Yes
                        </Button>
                    </Modal.Actions>
                </Modal>
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
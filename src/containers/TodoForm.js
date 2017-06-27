import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Header, Segment, Input, Label, Form, Button } from "semantic-ui-react";

import { createTodo, updateTodo, unsetTodoForEdit } from "./../actions/TodoActions";

function validate(values) {
    var errors = {};
    const { name } = values;
    if (!name || name.trim() === "") {
        errors.name = "Todo Name is Required";
    }
    return errors;
}

class TodoForm extends Component {
    renderField({ input, meta: { touched, error }, ...custom }) {
        const hasError = touched && error !== undefined;
        return (
            <div>
                <Input type="text" placeholder="Enter Todo Name" error={hasError} fluid {...input} {...custom} />
                {hasError && <Label basic color="red" pointing>{error}</ Label>}
            </div>
        )
    }
    onSubmit(values, dispatch) {
        const { id, name } = values;
        if (id) {
            return dispatch(updateTodo(values));
        }
        else {
            return dispatch(createTodo(name));
        }
    }
    onCancelButtonClick(e) {
        e.preventDefault();
        this.props.dispatch(unsetTodoForEdit());
    }
    render() {
        const { handleSubmit, pristine, initialValues, errors, submitting } = this.props;
        const id = initialValues && initialValues.id;
        let headerText = null;
        let cancelButton = null;
        if (id) {
            headerText = "Edit Todo";
            cancelButton = <Button disabled={submitting} onClick={this.onCancelButtonClick.bind(this)} >Cancel</Button>;
        }
        else {
            headerText = "Add Todo";
            cancelButton = null;
        }
        return (
            <Segment textAlign='center'>
                <Header as="h2">{headerText}</Header>
                <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Form.Field inline>
                        <Field name="name" component={this.renderField}></Field>
                    </Form.Field>
                    <Button loading={submitting} disabled={submitting}>{headerText}</Button>
                    {cancelButton}
                </Form>
            </Segment>
        )
    }
}

function mapStatesToProps(state) {
    return {
        initialValues: state.todo.editTodo
    }
}

export default connect(mapStatesToProps)(reduxForm({
    form: "TodoForm",
    validate,
    enableReinitialize: true
})(TodoForm));


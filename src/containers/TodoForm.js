import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import { Header, Segment, Input, Label, Form, Button } from "semantic-ui-react";

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
        console.log(values);
    }
    render() {
        const { handleSubmit, pristine, initialValues, errors, submitting } = this.props;
        return (
            <Segment textAlign='center'>
                <Header as="h2">Add Todo</Header>
                <Form onSubmit={handleSubmit(this.onSubmit)}>
                    <Form.Field inline>
                        <Field name="name" component={this.renderField}></Field>
                    </Form.Field>
                    <Button loading={submitting} disabled={submitting}>Add Todo</Button>
                </Form>
            </Segment>
        )
    }
}

function mapStatesToProps(state) {
    return {
        initialValues: {
            name: ""
        }
    }
}

export default connect()(reduxForm({
    form: "TodoForm"
})(TodoForm));


import { ErrorMessage, Field, Form, Formik } from 'formik';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from './AuthenticationService.js';

function TodoComponent(props){

    const [obj, setObj] = useState({
        description: "",
        targetDate: ""
    });

    useEffect(() => {
        const username = AuthenticationService.getLoginUserName();
        TodoDataService.getTodo(username, props.match.params.id)
            .then(res =>{ setObj({
                description: res.data.description || "",
                targetDate: moment(res.data.targetDate).format('YYYY-MM-DD')
            })})
            .catch( error => {console.log(error.message)});
        
    },[props.match.params.id])


    const onSubmit = (values) => {
        
        const username = AuthenticationService.getLoginUserName();

        if(parseInt(props.match.params.id) === -1){
            console.log('new todo')
            TodoDataService.createTodo(username, {
                id: props.match.params.id,
                description: values.description,
                targetDate: values.targetDate
            }).then(() => {props.history.push("/todos");});
        } else{
            console.log('update todo')
            TodoDataService.editTodo(username, props.match.params.id, {
                id: props.match.params.id,
                description: values.description,
                targetDate: values.targetDate
            }).then(() => {props.history.push("/todos");})
        }

        
    }

    const validate = (values) => {
        let errors = {};
        if(!values.description){
            errors.description = "Enter a description"
        } else if(values.description.length < 5){
            errors.description = "Enter over 5 words"

        }

        if(!moment(values.targetDate).isValid()){
            errors.targetDate = "Enter a valid date"
        }
        return errors;
    }

    return (
        <div>
            <h1>Todo</h1>
            <div className="container">
                <Formik 
                    initialValues={obj} 
                    onSubmit={onSubmit} 
                    validate={validate}
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}>
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field className="form-control" type="text" name="description"/>
                                </fieldset>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field className="form-control" type="date" name="targetDate"/>
                                </fieldset>
                                <button className="btn btn-success" type="submit">Save</button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}

export default TodoComponent;
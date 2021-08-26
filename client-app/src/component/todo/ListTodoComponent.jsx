import React, { useEffect, useState } from 'react';
import TodoDataService from '../../api/todo/TodoDataService.js';
import AuthenticationService from './AuthenticationService.js';
import moment from 'moment';

function ListTodoComponent(props){

    const [todos, setTodos] = useState([]); 
    const [deleteMessage, setDeleteMessage] = useState();
    useEffect(() => {
        const username = AuthenticationService.getLoginUserName();
        TodoDataService.retrieveAllTodos(username).then(res => setTodos(res.data));
    },[deleteMessage])

    const deleteTodoClick = (id) => {
        const username = AuthenticationService.getLoginUserName();
        TodoDataService.deleteTodo(username, id)
            .then(res => setDeleteMessage(`delete ${id} successfully`))
            .catch(err => {console.log(err.messege)});
    }

    const editTodoClick = (id) => {
        console.log('edit' + id);
        props.history.push(`/todos/${id}`);
    }

    const newTodoClick = () => {
        props.history.push(`/todos/-1`);
    }

    return (
        <div>
            <h1>List Todo</h1>
            {deleteMessage && <div className="alert alert-success">{deleteMessage}</div>}
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Done</th>
                            <th>Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((todo,index) => 
                            <tr key={"todo"+index}>
                                <td>{todo.description}</td>
                                <td>{todo.done.toString()}</td>
                                <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                <td><button className="btn btn-warning" onClick={()=>editTodoClick(todo.id)} >Edit</button></td>
                                <td><button className="btn btn-danger" onClick={()=>deleteTodoClick(todo.id)} >Delete</button></td>
                            </tr>    
                            )
                        }
                    </tbody>
                </table>
                <div className="row">
                        <button className="btn btn-success" onClick={newTodoClick}> Create New</button>
                </div>
            </div>
        </div>
    );
}

export default ListTodoComponent;
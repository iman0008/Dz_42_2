import React from 'react';
import classes from './Todo.module.scss';
import Button from '../button/Button';


const Todo = ({
                  todo,
                  handleDone,
                  handleDelete
              }) => {
    return (
        <li className={`${classes.li} ${todo.completed ? classes.completed : ''}`}>
            <div className={classes.info}>
                <p>id: {todo.id}</p>
                <p>title: {todo.title}</p>
                {!todo.completed && <p>completed: {todo.completed ? 'true' : 'false'}</p>}
            </div>
            <div className={classes.btns}>
                <Button name={'Edit'} action={() => {
                }} color={'primary'}/>
                <Button name={'Done'} action={() => handleDone(todo.id)} color={'secondary'}/>
                <Button name={'Delete'} action={() => {
                    handleDelete(todo.id);
                }} color={'error'}/>
            </div>
        </li>
    );
};

export default Todo;
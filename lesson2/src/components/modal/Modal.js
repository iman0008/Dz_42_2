import React from 'react';
import classes from './Modal.module.scss';
import Input from '../input/Input';


const Modal = ({children, handleShow, name, handleInput}) => {
    return (
        <div>
            <div className={classes.wrapper}/>
            <div className={classes.content}>
                <button onClick={()=>handleShow(name)}>Закрыть</button>
                <Input placeholder={'введите текст'} action={handleInput}/>
                {children}
            </div>
        </div>
    );
};

export default Modal;
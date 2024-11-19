import React from 'react';
import classes from './Modal.module.scss';
import Input from '../input/Input';
import Button from '../button/Button';


const ModalPokemon = ({children, handleShow}) => {
    return (
        <div>
            <div className={classes.wrapper}/>
            <div className={classes.content}>
                <Button name={'Закрыть'} action={()=>handleShow()}/>
                {children}
            </div>
        </div>
    );
};

export default ModalPokemon;
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Dz1 from '../components/Dz1';
import Example from '../components/Example/Example';
import Modal from '../components/modal/Modal';
import Count from '../components/count/Count';


const MainPage = () => {
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const [name, setName] = useState('')
    const [inputValue, setInputValue] = useState('')
    console.log(inputValue);

    const handleInput = (event) => {
        setInputValue(event.target.value);
    }
    const handleShow = (name) => {
        setName(name)
        if (name==='show') setShow(prevState => !prevState)
        if (name==='show2') setShow2(prevState => !prevState)
    }
    return (
        <div>
            {/*<Header/>*/}
            {/*<div className='btn'>MainPage</div>*/}
            {/**/}
            {/*<Button name={'Open'} color={'primary'}/>*/}
            {/*<Button name={'Close'} color={'error'}/>*/}
            {/*<Button name={'Save'} color={'secondary'}/>*/}
            {/*<Dz1 name={'Bakyt'} age={18}/>*/}
            {/*/!*<Footer/>*!/*/}
            {/*<Example name={'Bakyt'}>*/}
            {/*    <div style={{backgroundColor: 'blueviolet'}}>*/}
            {/*        <p style={{color: "red"}}>name Bakyt</p>*/}
            {/*    </div>*/}
            {/*</Example>*/}
            inputValue:{inputValue}
            <button onClick={()=>handleShow('show')}>Открыть</button>
            <button onClick={()=>handleShow('show2')}>Открыть</button>
            {
                show && <Modal
                    handleShow={handleShow}
                    name={name}
                    handleInput={handleInput}
                >
                    <h1>Hello</h1>
                </Modal>
            }
            {
                show2 && <Modal handleShow={handleShow} name={name}>
                    <h1>Hello2</h1>
                </Modal>
            }
            <Count/>
        </div>
    );
};

export default MainPage;
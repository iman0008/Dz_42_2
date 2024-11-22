import React, { useEffect, useState } from 'react';
import TodoList from '../components/todoList/TodoList';
import Button from '../components/button/Button';
import Modal from '../components/modal/Modal';
import Pagination from '../components/pagination/Pagination';


const TodoPage = () => {
    const [ show, setShow ] = useState(false);
    const [ offset, setOffset ] = useState(0);
    console.log(offset,'offset');
    const [ show2, setShow2 ] = useState(false);
    const [ name, setName ] = useState('');
    const [ inputValue, setInputValue ] = useState('');
    const [ todoList, setTodoList ] = useState([]);
    const handleInput = (event) => {
        setInputValue(event.target.value);
    };

    const handleAdd = () => {
        console.log('add');
        setTodoList(prevState => [ ...prevState, {
            id: todoList.length === 0 ? 1 : todoList[ todoList.length - 1 ].id + 1,
            title: inputValue,
            completed: false
        } ]);
    };

    const handleEdit = (todoEdit) => {
        console.log(todoEdit);
        todoList.map(todo=> {
            if (todoEdit.id === todo.id) return todo.title=todoEdit.title
        })
        setTodoList([ ...todoList ]);
    }

    const handleDone = (id) => {
        todoList.map(todo => {
            if (id === todo.id) {
                return todo.completed = !todo.completed;
            }
        });
        setTodoList([ ...todoList ]);
    };

    const handleDelete = (id) => {
        setTodoList(todoList.filter(todo => todo.id !== id));
    };
    const handleShow = (name) => {
        setName(name);
        if (name === 'show') setShow(prevState => !prevState);
        if (name === 'show2') setShow2(prevState => !prevState);
    };

    const [limit, setLimit] = useState(4)
    console.log(limit,'limit ');
    const page = (offset / Number(limit))+1
    const handleNext = () => {
        setOffset(prevState => prevState+Number(limit))
    }
    const handlePrev = () => {
        setOffset(prevState => prevState-Number(limit))
    }
    const fetchApi = async() => {
        try {
            const response =
                await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_start=${offset}`);
            return await response.json();
        } catch(e) {
            console.log(e);
        } finally {
            console.log('finally');
        }
    };

    useEffect(()=>{
        fetchApi().then(data=>setTodoList(data))
    },[offset, limit])

    // useEffect(() => {
    //     console.log('useEffect');
    // }, [ show ]);
    //
    // useEffect(() => {
    //     const myLocalStorage = JSON.parse(localStorage.getItem('todo'));
    //     if (myLocalStorage === null) {
    //         return localStorage.setItem('todo', JSON.stringify(todoList));
    //     }
    //     if (myLocalStorage !== 0) {
    //         setTodoList(myLocalStorage);
    //     }
    // }, []);

    // useEffect(() => {
    //     localStorage.setItem('todo', JSON.stringify(todoList));
    // }, [ todoList ]);





    return (
        <div>
            <input type="number" onChange={(event)=>setLimit(event.target.value)}/>
            <Pagination page={page} next={handleNext}  prev={handlePrev}/>
            <TodoList
                todoList={todoList}
                handleDone={handleDone}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
            <Button name={'Открыть'} action={() => handleShow('show')}/>
            <Button name={'Открыть2'} action={() => handleShow('show2')}/>
            <button onClick={() => handleShow('show')}>Открыть</button>
            <button onClick={() => handleShow('show2')}>Открыть</button>
            {
                show && <Modal
                    handleShow={handleShow}
                    name={name}
                    handleInput={handleInput}
                    handleAdd={handleAdd}
                >
                    <h1>Hello</h1>
                </Modal>
            }
            {
                show2 && <Modal handleShow={handleShow} name={name}>
                    <h1>Hello2</h1>
                </Modal>
            }
        </div>
    );
};

export default TodoPage;
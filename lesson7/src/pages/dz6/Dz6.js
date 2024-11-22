import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classes from './Dz6.module.scss';
import axios from 'axios';

const regex = /^\d+$/
const regExEmail = new RegExp(/^[a-zA-Z\d-_\.]+@[a-zA-Z\d-_]+\.[a-zA-Z-_]{2,8}$/);


const schema = Yup.object().shape({
    name: Yup.string().required('обязательное поле').min(3, 'минимальное 3'),
    email: Yup.string().required('обязательное поле').matches(regExEmail, 'введите правельную почту'),
    password: Yup.string().required('обязательное поле').min(3, 'минимальное 3'),
    password2: Yup.string().oneOf([Yup.ref('password'), null, 'пароли не совпадают']).required('обязательное поле').min(3, 'минимальное 3'),
});
const Dz6 = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            name: 'Bakyt'
        },
        resolver: yupResolver(schema)
    });

    console.log(isValid, 'isValid');

    const submit = (data) => {
        postAxios(data)
        console.log(data, 'form');
    };
    const error = (data) => {
        console.error(data);
    };
    const postAxios = async(data) => {
        const response = await axios.post('http://localhost:5000/user',
            data);
        console.log(response,'response');
    };

    return (
        <div>
            <form onSubmit={handleSubmit(submit, error)} className={classes.form}>
                <input
                    type="text"
                    placeholder="Напишите имя"
                    aria-invalid={errors.name ? true : false}
                    {
                        ...register('name')
                    }
                />
                {
                    errors?.name?.message && <p>{errors.name.message}</p>
                }
                <input
                    type="text"
                    placeholder="Напишите email"
                    aria-invalid={errors.email ? true : false}

                    {
                        ...register('email')
                    }
                />

                {
                    errors?.email?.message && <p>{errors.email.message}</p>
                }
                <input
                    type="text"
                    placeholder="Напишите password"
                    aria-invalid={errors.password ? true : false}

                    {
                        ...register('password')
                    }
                />
                <input
                    type="text"
                    placeholder="Повторите password"
                    aria-invalid={errors.password2 ? true : false}

                    {
                        ...register('password2')
                    }
                />

                {
                    errors?.password2?.message && <p>{errors.password2.message}</p>
                }
                <button>Отправить</button>
            </form>
        </div>
    );
};

export default Dz6;
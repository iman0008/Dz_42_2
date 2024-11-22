import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classes from './FormPage.module.scss';
import axios from 'axios';

const regex = /^\d+$/

const schema = Yup.object().shape({
    name: Yup.string().required('обязательное поле').min(3, 'минимальное 3'),
    age: Yup.string().required('обязательное поле').matches(regex, 'только цифры').min(2, 'минимальное 2'),
});
const FormPage = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        clearErrors,
        setValue,
        reset,
        control
    } = useForm({
        defaultValues: {
            name: 'Bakyt'
        },
        resolver: yupResolver(schema)
    });

    console.log(isValid, 'isValid');

    const name = watch('name');
    const submit = (data) => {
        console.log(data);
    };
    const error = (data) => {
        console.log(data);
    };



    return (
        <div>
            <form onSubmit={handleSubmit(submit, error)} className={classes.form}>
                <div>{name}</div>
                <Controller
                    name={'age2'}
                    control={control}
                    render={({ field }) =>
                        <input
                            {...field}
                            type="text"
                            onInput={(e)=> {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '')
                            }}
                        />
                //         <input
                //         name="name2"
                //         value={field.value}
                //     onChange={field.onChange}
                //     onBlur={field.onBlur}
                //     ref={field.ref}
                // />
                    }/>
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
                    placeholder="Напишите возраст"
                    aria-invalid={errors.age ? true : false}

                    {
                        ...register('age')
                    }
                />

                {
                    errors?.age?.message && <p>{errors.age.message}</p>
                }
                <button type="button" onClick={() => setValue('name', 'Адилет')}>Адилет</button>
                <button type="button" onClick={() => clearErrors()}>clearErrors</button>
                <button type="button" onClick={() => reset()}>очистить</button>
                <button>Отправить</button>
            </form>
        </div>
    );
};

export default FormPage;
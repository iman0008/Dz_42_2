import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import classes from './FormPage.module.scss';

const regex = /^\d+$/;

const schema = Yup.object().shape({
    name: Yup.string().required('Обязательное поле').min(3, 'Минимум 3 символа'),
    age: Yup.string()
        .required('Обязательное поле')
        .matches(regex, 'Только цифры')
        .min(2, 'Минимум 2 символа'),
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
        control,
    } = useForm({
        defaultValues: {
            name: 'Bakyt',
            age: '',
        },
        resolver: yupResolver(schema),
    });

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
                    name="age"
                    control={control}
                    render={({ field }) => (
                        <input
                            {...field}
                            type="text"
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            }}
                            placeholder="Введите возраст"
                        />
                    )}
                />
                {errors?.age?.message && <p>{errors.age.message}</p>}
                <input
                    type="text"
                    placeholder="Введите имя"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    {...register('name')}
                />
                {errors?.name?.message && <p>{errors.name.message}</p>}
                <button type="button" onClick={() => setValue('name', 'Адилет')}>
                    Установить имя Адилет
                </button>
                <button type="button" onClick={() => clearErrors()}>
                    Очистить ошибки
                </button>
                <button type="button" onClick={() => reset()}>
                    Очистить форму
                </button>
                <button type="submit">Отправить</button>
            </form>
        </div>
    );
};

export default FormPage;

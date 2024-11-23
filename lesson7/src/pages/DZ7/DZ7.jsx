import { useState, useEffect } from 'react'
import * as Yup from 'yup'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from './DZ7.module.scss'
import StudentCard from "../../components/StudentCard/StudentCard";

const BASE_URL = 'http://localhost:8000/student'

const schema = Yup.object().shape({
    name: Yup.string().required('required').min(3, 'min 3').max(60, 'max 60'),
    surname: Yup.string().required('required').min(3, 'min 3').max(60, 'max 60'),
    groupId: Yup.string().notRequired().nullable(),
})

const getStudents = async () => {
    try {
        const { data } = await axios.get(BASE_URL)
        return data
    }
    catch (error) {
        return Promise.reject(error.message)
    }
}

const deleteStudent = async (id) => {
    try {
        const { data } = await axios.delete(`${BASE_URL}/${id}`)
        return data
    }
    catch (error) {
        return Promise.reject(error.message)
    }
}

const addStudent = async (student) => {
    try {
        const { data } = await axios.post(BASE_URL, student)
        return data
    }
    catch (error) {
        return Promise.reject(error.message)
    }
}

const editStudent = async (editedStudent) => {
    try {
        const { data } = await axios.put(`${BASE_URL}/${editedStudent.id}`, editedStudent)
        return data
    }
    catch (error) {
        return Promise.reject(error.message)
    }
}

const Dz7 = () => {
    const [students, setStudents] = useState([])
    const [isEdit, setIsEdit] = useState(null)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: {
            name: '',
            surname: '',
            groupId: null,
        }
    })

    useEffect(() => {
        getStudents().then(data => setStudents(data))
    }, [])

    const deleteStudentById = (id) => {
        deleteStudent(id).then(() => {
            getStudents().then(data => setStudents(data))
        })
    }

    const addNewStudent = (data) => {
        const newStudent = {
            ...data,
            id: Date.now(),
        }
        addStudent(newStudent)
            .then(() => getStudents().then(data => setStudents(data)))
    }

    const saveStudentEdit = (editedStudent) => {
        editStudent(editedStudent)
            .then(() => getStudents().then(data => setStudents(data)))
    }

    return (
        <div className={styles.students}>
            <form onSubmit={handleSubmit(addNewStudent)}>
                {errors?.name?.message && <span>{errors.name.message}</span>}
                <input
                    type={'text'}
                    name={'name'}
                    placeholder={'Enter name'}
                    aria-invalid={!!errors.name}
                    {...register('name')}
                />
                {errors?.surname?.message && <span>{errors.surname.message}</span>}
                <input
                    type={'text'}
                    name={'surname'}
                    placeholder={'Enter surname'}
                    aria-invalid={!!errors.surname}
                    {...register('surname')}
                />
                {errors?.groupId?.message && <span>{errors.groupId.message}</span>}
                <input
                    type={'number'}
                    name={'groupId'}
                    placeholder={'Enter groupId'}
                    aria-invalid={!!errors.groupId}
                    {...register('groupId')}
                />
                <button>create</button>
            </form>
            <ul>
                {students?.map((student) => (
                    <StudentCard
                        student={student}
                        key={student.id}
                        isEdit={isEdit}
                        deleteStudentById={deleteStudentById}
                        saveStudentEdit={saveStudentEdit}
                        setIsEdit={setIsEdit}
                    />
                ))}
            </ul>
        </div>
    )
}

export default Dz7
import { useState } from 'react'

const StudentCard = (props) => {

    const {
        student,
        deleteStudentById,
        saveStudentEdit,
        setIsEdit,
        isEdit
    } = props

    const [newName, setNewName] = useState(student.name ?? '')
    const [newSurname, setNewSurname] = useState(student.surname ?? '')
    const [newGroupId, setNewGroupId] = useState(student.groupId ?? 1)

    const saveChanges = () => {
        const editedStudent = {
            ...student,
            name: newName,
            surname: newSurname,
            groupId: newGroupId
        }
        saveStudentEdit(editedStudent)
        setIsEdit(null)
    }

    const cancelChanges = () => {
        setNewName(student.name ?? '')
        setNewSurname(student.surname ?? '')
        setNewGroupId(student.groupId ?? '')
        setIsEdit(null)
    }

    return (isEdit === student.id) ? (
        <li>
            <input
                value={newName}
                onChange={event => setNewName(event.target.value)}
                name={'name'}
                type={'text'}
                required
            />
            <input
                value={newSurname}
                onChange={event => setNewSurname(event.target.value)}
                name={'surname'}
                type={'text'}
                required
            />
            <input
                value={newGroupId}
                onChange={event => setNewGroupId(event.target.value)}
                name={'groupId'}
                type={'number'}
                required
            />
            <span>ID: {student.id}</span>
            <button onClick={saveChanges}>save</button>
            <button onClick={cancelChanges}>cancel</button>
        </li>
    ) : (
        <li>
            <h3>{student.name} {student.surname}</h3>
            <p>groupId: {student.groupId}</p>
            <span>ID: {student.id}</span>
            <button onClick={() => deleteStudentById(student.id)}>remove</button>
            <button onClick={() => setIsEdit(student.id)}>edit</button>
        </li>
    )
}

export default StudentCard
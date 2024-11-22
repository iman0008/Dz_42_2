import React, { useEffect, useState } from "react";
import classes from "./Fetch.module.scss";
import axios from "axios";

const Base_URL = "http://localhost:5000/student";
const Fetch = () => {
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);
  console.log(users, "users");
  const getStudents = async () => {
    const response = await fetch(Base_URL);
    const data = await response.json();
    return data;
  };

  const postStudent = async () => {
    const response = await fetch(Base_URL, {
      method: "POST",
      headers: {
        "Content-type": "application-json",
      },
      body: JSON.stringify({
        id: String(Number(students[students.length - 1].id) + 1),
        surname: "Сариев",
        name: "Бактыбек",
        groupId: 4,
      }),
    });
    console.log(response, "respo");
    await getStudents().then((data) => setStudents(data));
  };

  const postAxios = async () => {
    const response = await axios.post(Base_URL, {
      id: String(Number(students[students.length - 1].id) + 1),
      surname: "Сариев",
      name: "Бактыбек",
      groupId: 4,
    });
    console.log(response, "response");
    await getStudents().then((data) => setStudents(data));
  };

  const putAxios = async (id) => {
    const response = await axios.put(`${Base_URL}/${id}`, {
      surname: "Сариев",
      name: "Кубанычбек",
    });
    console.log(response, "response");
    await getStudents().then((data) => setStudents(data));
  };
  const patchAxios = async (id) => {
    const response = await axios.patch(`${Base_URL}/${id}`, {
      name: "Алтынбек",
    });
    console.log(response, "response");
    await getStudents().then((data) => setStudents(data));
  };
  const getAxios = async () => {
    const response = await axios(Base_URL);
    console.log(response.data);
  };
  const getUsers = async () => {
    const response = await axios("http://localhost:5000/user");
    return response.data;
  };
  const deleteAxios = async (id) => {
    const response = await axios.delete(`${Base_URL}/${id}`);
    console.log(response.data);
    await getStudents().then((data) => setStudents(data));
  };

  useEffect(() => {
    getStudents().then((data) => setStudents(data));
    // getUsers()
    getUsers().then((response) => setUsers(response));
    // getAxios();
  }, []);

  return (
    <div className={classes.students}>
      <button onClick={() => postStudent()}>postStudent</button>
      <button onClick={() => postAxios()}>postAxios</button>
      <button onClick={() => putAxios(20)}>putAxios</button>
      <button onClick={() => patchAxios(20)}>patchAxios</button>
      {/*{*/}
      {/*    users.map(user => <div className={classes.student} key={user.id}>*/}
      {/*        <div>id: {user.id}</div>*/}
      {/*        <div>name: {user.name}</div>*/}
      {/*        <div>user: {user.email}</div>*/}
      {/*        <div>user: {user.password}</div>*/}
      {/*    </div>)*/}
      {/*}*/}

      {students.map((student) => (
        <div className={classes.student} key={student.id}>
          <div>id: {student.id}</div>
          <div>name: {student.name}</div>
          <div>groupId: {student.groupId}</div>
          <button onClick={() => deleteAxios(student.id)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Fetch;

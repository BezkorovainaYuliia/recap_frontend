import axios from "axios";
import type {Status, ToDo} from "../types/todo.ts";
import * as React from "react";
import "./ToDoPages.css";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

type ToDoPageProps = {
    status: Status; // "OPEN" | "IN_PROGRESS" | "DONE"
};


export default function ToDoPage(status: Readonly<ToDoPageProps>) {
    const [todo, setTodo] = React.useState<ToDo[]>([]);
    const navigate = useNavigate();

    function loadTodos() {
        axios.get<ToDo[]>("/api/todo")
            .then(res => {
                setTodo(res.data);
            })
            .catch(err => console.error(err));
    }

    useEffect(() => {
        loadTodos();
    }, []);


    const filtered = todo.filter(x => x.status === status.status);


    function deleteTodo(id: string) {
        axios.delete("/api/todo/" + id)
        .then(res => {
            console.log(res.statusText);
            loadTodos();})
        .catch(err => console.error(err));
    }

    function editTodo(id: string) {
        navigate(`/${id}/update`);
    }

    return(
        <>
            <h1>{status.status}</h1>
            <div className="todo-container">
                {filtered.map(t => (
                    <div key={t.id} className="todo">
                            <p>{t.description}</p>
                        <button onClick={() => editTodo(t.id)}>Edit</button>
                        <button onClick={() => deleteTodo(t.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </>

    )
}
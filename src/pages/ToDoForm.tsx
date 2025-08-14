import "./ToDoForm.css";
import {type FormEvent, useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import type {Status, ToDo} from "../types/todo.ts";

export default function ToDoForm() {

    const {id} = useParams();
    const navigate = useNavigate();

    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<Status>("OPEN");

    const allowedStatuses: Status[] = ["OPEN", "IN_PROGRESS", "DONE"];

    useEffect(() => {
        if (id) {
            axios.get<ToDo>(`/api/todo/${id}`)
                .then(res => {
                    setDescription(res.data.description);
                    setStatus(res.data.status);
                    console.log(res.data);
                })
                .catch(err => console.error(err));
        }
    },[id]);

    function save(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = { id, description, status };
        const request = id
            ? axios.put(`/api/todo/${id}/update`, data)
            : axios.post(`/api/todo`, data);

        request
            .then(() => navigate("/"))
            .catch(err => console.error(err))
            .finally(() => {
                setStatus("OPEN");
                setDescription("");
            });
    }

    return (
        <div>
            <h1>{id ? "Edit Task" : "Create Task"}</h1>
            <form onSubmit={save}>
                <label className="label-input">
                    Description:
                    <input
                        value={description ?? ""}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={id ? description : "Description"}
                    />
                </label>
                <br/>
                <label>
                    Status:
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value as Status)}
                    >
                        {allowedStatuses.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </label>
                <br/>
                <button>{id ? "Save Changes" : "Create"}</button>
            </form>
        </div>
    );
}

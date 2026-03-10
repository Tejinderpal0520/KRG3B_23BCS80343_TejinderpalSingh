import { useState } from "react";
import useForm from "../hooks/useForm";

const TaskManager = () => {

    const [tasks, setTasks] = useState([]);

    const { values, handleChange, resetForm } = useForm({
        title: "",
        priority: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (value.title.trim() == "") {
            alert("Task title cannot be empty");
            return;
        }

        const newTask = {
            title: values.title,
            priority: values.priority
        };

        setTasks([...tasks, newTask]);

        resetForm();
    };

    return (
        <>
            <h1>Task Manager</h1>

            <form onSubmit={handleSubmit}>

                <p>Task Title</p>
                <input
                    type="text"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    required
                />

                <p>Priority</p>
                <select
                    name="priority"
                    value={values.priority}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <br /><br />

                <button type="submit">Add Task</button>

            </form>

            <hr />

            <h2>Task List</h2>

            {tasks.map((task, index) => (
                <div key={index}>
                    {task.title} | {task.priority}
                </div>
            ))}

        </>
    );
};

export default TaskManager;
import React, { useState, useEffect } from 'react';
import Task from "./Task"

function ToDoList() {
    const [todoList, settodoList] = useState([]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        settodoList([{ title: "Task 1", task: "Read books." }, { title: "Task 2", task: "Do laundry." }])
    }, []);

    return (
        <div className="w-2/3 max-w-screen-lg mx-auto mt-20">
            {todoList.map((el, index) => (
                <Task title={el.title} task={el.task}></Task>
            ))}
        </div>
    );
}

export default ToDoList;
import React, { useState, useEffect } from 'react';

function Task(props) {
    const [classString, setclassString] = useState("");

    useEffect(() => {
        let colors = ["pink", "purple", "blue", "yellow", "red", "green", "indigo"]
        let color = colors[Math.floor(Math.random() * colors.length)];
        let classString = "rounded border bg-" + color + "-200 shadow p-4 mb-4"
        setclassString(classString);
    }, []);

    return (
        <div className={classString}>
            <div className="font-bold">{props.title}</div>
            {props.task}
        </div>
    );
}

export default Task;
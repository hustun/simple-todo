import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Draggable } from "react-beautiful-dnd";

function Task(props) {
    const [classString, setclassString] = useState("");
    const [done, setDone] = useState(false);

    useEffect(() => {
        console.log("test")
        let colors = ["pink", "purple", "blue", "yellow", "red", "green", "indigo"]
        let color = colors[Math.floor(Math.random() * colors.length)];
        let classString = "rounded border bg-" + color + "-200 shadow p-4 mb-4 flex "
        setclassString(classString);
    }, []);

    return (
        <Draggable key={"task-" + props.index} draggableId={"task-" + props.index} index={props.index}>
            {(provided) =>
            (
                <div ref={provided.innerRef} className={classString + (done ? "line-through text-gray-600" : "")}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>

                    <Checkbox onClick={() => { setDone(prevDone => !prevDone) }} checked={done} />
                    <div>
                        <div className="font-bold">{props.title}</div>
                        {props.task}
                    </div>

                </div>
            )}

        </Draggable>

    );
}

export default Task;
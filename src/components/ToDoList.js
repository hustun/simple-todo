import React, { useState, useEffect } from 'react';
import Task from "./Task"
import { DragDropContext, Droppable } from "react-beautiful-dnd";

function ToDoList() {
    const [todoList, settodoList] = useState([]);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        settodoList([{ id: "1", title: "Task 1", task: "Read books." }, { id: "2", title: "Task 2", task: "Do laundry." }])
    }, []);

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items = reorder(
            todoList,
            result.source.index,
            result.destination.index
        );

        console.log(items)

        settodoList(items)
    }


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="w-2/3 max-w-screen-lg mx-auto mt-20">
                        {todoList.map((el, index) => (
                            <Task title={el.title} task={el.task} index={index} key={el.id}>{console.log("here")}</Task>

                        ))}
                        {provided.placeholder}
                    </div>
                )}

            </Droppable>
        </DragDropContext >

    );
}

export default ToDoList;
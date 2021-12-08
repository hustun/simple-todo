import React, { useState, useEffect } from "react";
import Task from "./Task";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TextField from "@mui/material/TextField";
import http from "../common/http";
import { RiTodoLine } from "react-icons/ri";

function ToDoList() {
  const [todoList, setTodoList] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newTask, setNewTask] = useState("");

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setTodoList([
      { id: "1", title: "Task 1", task: "Read books." },
      { id: "2", title: "Task 2", task: "Do laundry." },
    ]);
    http
      .get("/tasks")
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setTodoList(response.data.data);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
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

    console.log(items);

    setTodoList(items);
  };

  const onTaskSubmit = () => {
    console.log(newTitle);
    console.log(newTask);

    http
      .post("/tasks", {
        title: newTitle,
        task: newTask,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          console.log("here");
          let listTemp = [...todoList];
          listTemp.push({
            id: response.data.id,
            title: newTitle,
            task: newTask,
          });
          setTodoList(listTemp);

          setNewTitle("");
          setNewTask("");
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <div className="text-center mb-4 header-font text-6xl flex justify-center items-center">
        Todo List <RiTodoLine className="ml-5 text-5xl" />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full sm:w-2/3 mx-auto"
            >
              {todoList.map((el, index) => (
                <Task
                  title={el.title}
                  task={el.task}
                  index={index}
                  key={el.id}
                ></Task>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="w-full rounded border bg-red-200 shadow p-4 mb-4 sm:w-2/3 mx-auto">
        <div>
          <TextField
            id="outlined-basic"
            label="Title"
            variant="standard"
            size="small"
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start">
          <TextField
            className="w-auto sm:w-3/4"
            id="standard-basic"
            label="Task"
            variant="standard"
            size="small"
            margin="normal"
            value={newTask}
            onChange={(e) => {
              setNewTask(e.target.value);
            }}
          />
          <button
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded self-center sm:self-end ml-0 sm:ml-auto"
            onClick={onTaskSubmit}
            disabled={!(newTitle && newTask)}
          >
            Add Task
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ToDoList;

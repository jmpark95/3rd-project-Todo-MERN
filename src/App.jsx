import { useEffect, useState, useReducer } from "react";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { nanoid } from "nanoid";

function App() {
   const initialState =
      localStorage.length === 0
         ? []
         : JSON.parse(localStorage.getItem("tasks"));

   const [tasks, dispatch] = useReducer(reducer, initialState);
   const [filter, setFilter] = useState("all");

   useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
   }, [tasks]);

   let filterFunction;
   if (filter === "all") {
      filterFunction = (task) => task;
   } else if (filter === "todo") {
      filterFunction = (task) => task.completed === false;
   } else if (filter === "done") {
      filterFunction = (task) => task.completed === true;
   }

   const taskList = tasks.filter(filterFunction).map((task) => {
      return (
         <Todo
            key={task.id}
            id={task.id}
            name={task.name}
            completed={task.completed}
            toggleCheckbox={toggleCheckbox}
            updateTask={updateTask}
            deleteTask={deleteTask}
         />
      );
   });

   function addTask(formInput) {
      dispatch({
         type: "added",
         id: nanoid(),
         name: formInput,
         completed: false,
      });
   }

   function updateTask(id, editingFieldText) {
      dispatch({
         type: "updated",
         id: id,
         name: editingFieldText,
      });
   }

   function deleteTask(id) {
      dispatch({
         type: "deleted",
         id: id,
      });
   }

   function toggleCheckbox(id) {
      dispatch({
         type: "toggled_checkbox",
         id: id,
      });
   }

   function handleFilter(e, newFilter) {
      if (newFilter !== null) {
         setFilter(newFilter);
      }
   }

   const tasksRemainingLength = tasks.filter(
      (task) => task.completed === false
   ).length;

   return (
      <div className="app">
         <h1 style={{ color: "#1976d2" }}>To-do App</h1>

         <Form addTask={addTask} />

         <h3>
            {tasksRemainingLength}{" "}
            {tasksRemainingLength === 1 ? "task" : "tasks"} left
         </h3>

         <div className="filter-container">
            <ToggleButtonGroup
               value={filter}
               exclusive
               onChange={handleFilter}
               aria-label="text alignment"
               sx={{ maxWidth: "100%" }}
            >
               <ToggleButton value="all" aria-label="all">
                  All
               </ToggleButton>
               <ToggleButton value="todo" aria-label="todo">
                  Todo
               </ToggleButton>
               <ToggleButton value="done" aria-label="done">
                  Done
               </ToggleButton>
            </ToggleButtonGroup>
         </div>

         <div className="todo-item-container">{taskList}</div>
      </div>
   );
}

function reducer(tasks, action) {
   switch (action.type) {
      case "added": {
         return [
            ...tasks,
            {
               id: action.id,
               name: action.name,
               completed: action.completed,
            },
         ];
      }
      case "updated": {
         return tasks.map((task) =>
            task.id === action.id ? { ...task, name: action.name } : task
         );
      }
      case "deleted": {
         return tasks.filter((task) => task.id !== action.id);
      }
      case "toggled_checkbox": {
         return tasks.map((task) =>
            task.id === action.id
               ? { ...task, completed: !task.completed }
               : task
         );
      }
   }
}

export default App;

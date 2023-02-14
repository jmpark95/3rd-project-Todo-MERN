import { useEffect, useState } from "react";
import Form from "./components/Form";
import Todo from "./components/Todo";

import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { nanoid } from "nanoid";
import { useQueryClient, useQuery } from "react-query";
import { getAllTodos } from "./apis";

function App() {
   const queryClient = useQueryClient();
   // const [tasks, setTasks] = useState([]);
   // const [filter, setFilter] = useState("all");

   const {
      isLoading,
      isError,
      data: tasks,
      error,
   } = useQuery("todos", getAllTodos);

   if (isLoading) {
      return <div>Loading...</div>;
   }

   if (isError) {
      return <div>Error: {error.message}</div>;
   }

   // let filterFunction;
   // if (filter === "all") {
   //    filterFunction = (task) => task;
   // } else if (filter === "todo") {
   //    filterFunction = (task) => task.completed === false;
   // } else if (filter === "done") {
   //    filterFunction = (task) => task.completed === true;
   // }

   const taskList = tasks.map((task) => {
      return (
         <Todo
            key={task._id}
            id={task._id}
            name={task.name}
            completed={task.completed}
            // toggleCheckbox={toggleCheckbox}
            // updateTask={updateTask}
            // deleteTask={deleteTask}
         />
      );
   });

   // const taskList = tasks.filter(filterFunction).map((task) => {
   //    return (
   //       <Todo
   //          key={task._id}
   //          id={task._id}
   //          name={task.name}
   //          completed={task.completed}
   //          toggleCheckbox={toggleCheckbox}
   //          updateTask={updateTask}
   //          deleteTask={deleteTask}
   //       />
   //    );
   // });

   // function addTask(formInput) {
   //    setTasks([...tasks, { id: nanoid(), name: formInput, completed: false }]);
   // }

   // function updateTask(id, editingFieldText) {
   //    setTasks(
   //       tasks.map((task) =>
   //          task.id === id ? { ...task, name: editingFieldText } : task
   //       )
   //    );
   // }

   // function deleteTask(id) {
   //    setTasks(tasks.filter((task) => task.id !== id));
   // }

   // function toggleCheckbox(id) {
   //    setTasks(
   //       tasks.map((task) =>
   //          task._id === id ? { ...task, completed: !task.completed } : task
   //       )
   //    );
   // }

   // function handleFilter(e, newFilter) {
   //    if (newFilter !== null) {
   //       setFilter(newFilter);
   //    }
   // }

   // const tasksRemainingLength = tasks.filter(
   //    (task) => task.completed === false
   // ).length;

   return (
      <div className="app">
         <h1 style={{ color: "#1976d2" }}>To-do List</h1>

         <Form />

         {/* <Form addTask={addTask} /> */}

         {/* <h3>
            {tasksRemainingLength}{" "}
            {tasksRemainingLength === 1 ? "task" : "tasks"} left
         </h3> */}

         {/* <div className="filter-container">
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
         </div> */}

         <div className="todo-item-container">{taskList}</div>
      </div>
   );
}

export default App;

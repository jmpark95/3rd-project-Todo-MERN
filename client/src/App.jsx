import { useState } from "react";
import Form from "./components/Form";
import Todo from "./components/Todo";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useQuery } from "react-query";
import { getAllTodos } from "./apis";

function App() {
   const [filter, setFilter] = useState("all");
   const {
      isLoading,
      isError,
      data: tasks,
      error,
   } = useQuery("todos", getAllTodos);

   if (isLoading) {
      return <h1>Loading...</h1>;
   }

   if (isError) {
      return <h1>Error: {error.message}</h1>;
   }

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
            key={task._id}
            id={task._id}
            name={task.name}
            completed={task.completed}
         />
      );
   });

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
         <h1 style={{ color: "#1976d2" }}>To-do List</h1>

         <Form />

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

export default App;

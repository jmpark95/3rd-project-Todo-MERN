import React, { useState } from "react";
import { Button, Checkbox, IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQueryClient } from "react-query";
import { deleteTodo } from "../apis";
const baseURL = "/";

export default function Todo({ id, name, completed }) {
   const [isEditing, setIsEditing] = useState(false);
   const [editingFieldText, setEditingFieldText] = useState("");
   const queryClient = useQueryClient();

   const deleteMutation = useMutation(deleteTodo, {
      onSuccess: () => {
         queryClient.invalidateQueries("todos");
      },
   });

   const updateMutation = useMutation(
      (id) => {
         return fetch(`${baseURL}${id}`, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ name: editingFieldText }),
         });
      },
      {
         onSuccess: () => {
            queryClient.invalidateQueries("todos");
         },
      }
   );

   const checkBoxMutation = useMutation(
      (id) => {
         return fetch(`${baseURL}${id}`, {
            method: "PATCH",
            headers: {
               "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ completed: !completed }),
         });
      },
      {
         onSuccess: () => {
            queryClient.invalidateQueries("todos");
         },
      }
   );

   if (isEditing === false) {
      return (
         <div className="todo-item" id={id}>
            {completed ? (
               <del style={{ color: "red", overflow: "auto" }}>{name}</del>
            ) : (
               <p style={{ overflow: "auto" }}>{name}</p>
            )}
            <div className="icons">
               <Checkbox
                  checked={completed}
                  onClick={() => {
                     checkBoxMutation.mutate(id);
                  }}
               />
               <IconButton
                  onClick={() => setIsEditing(true)}
                  sx={{ color: "#ff9800" }}
               >
                  <EditIcon />
               </IconButton>
               <IconButton
                  sx={{ color: "#d32f2f" }}
                  onClick={() => {
                     deleteMutation.mutate(id);
                  }}
               >
                  <DeleteIcon />
               </IconButton>
            </div>
         </div>
      );
   } else {
      return (
         <div className="todo-item" id={id}>
            <form>
               <TextField
                  fullWidth
                  style={{ justifyContent: "center" }}
                  sx={{
                     "& .MuiInputBase-input": {
                        padding: "0.1rem",
                     },
                  }}
                  value={editingFieldText}
                  onChange={(e) => {
                     setEditingFieldText(e.target.value);
                  }}
               />
               <div className="icons">
                  <Button
                     variant="outlined"
                     type="submit"
                     onClick={() => {
                        updateMutation.mutate(id);
                        setIsEditing(false);
                     }}
                  >
                     Submit
                  </Button>
               </div>
            </form>
         </div>
      );
   }
}

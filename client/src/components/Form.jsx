import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { addNewTodo } from "../apis";

export default function Form() {
   const [formInput, setFormInput] = useState("");

   const queryClient = useQueryClient();

   const mutation = useMutation(addNewTodo, {
      onSuccess: () => {
         queryClient.invalidateQueries("todos");
      },
   });

   return (
      <form
         onSubmit={(e) => {
            e.preventDefault();
            if (formInput) {
               setFormInput("");
               mutation.mutate({ name: formInput });
            }
         }}
      >
         <TextField
            id="outlined-basic"
            placeholder="Enter Todo"
            variant="outlined"
            fullWidth
            value={formInput}
            onChange={(e) => setFormInput(e.target.value)}
         />
         <Button variant="contained" type="submit">
            Add
         </Button>
      </form>
   );
}

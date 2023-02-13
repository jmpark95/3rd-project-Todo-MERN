import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

export default function Form({ addTask }) {
   const [formInput, setFormInput] = useState("");
   return (
      <form
         onSubmit={(e) => {
            e.preventDefault();
            if (formInput) {
               addTask(formInput);
               setFormInput("");
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

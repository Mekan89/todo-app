import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { AddCircleOutlineRounded } from "@mui/icons-material";
import { useSetRecoilState } from "recoil";
import { addTodo } from "../state/state";

export const TodoForm = () => {
  const [input, setInput] = useState("");
  const setAddTodo = useSetRecoilState(addTodo);

  const handleSubmit = e => {
    e.preventDefault();
    if(e.target.value.trim()!=="") {
      setAddTodo({ id: Date.now(), fields: { description: input, completed: false } });
      setInput("");
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        autoComplete="off"
        autoFocus={true}
        required
        fullWidth
        id="todo"
        label="Enter Todo"
        name="todo"
        value={input}
        onChange={event => setInput(event.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton color="primary" disabled={!input.trim()}>
              <AddCircleOutlineRounded />
            </IconButton>
          ),
        }}
      />
    </form>
  );
};

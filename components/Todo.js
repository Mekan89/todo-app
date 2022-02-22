import React from "react";
import { Checkbox, IconButton, Input, Paper, Stack } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { deleteTodo, toggleTodo, updateTodo } from "../state/state";
import { useSetRecoilState } from "recoil";
import { useState } from "react";

export const Todo = ({ todo }) => {
  const setDeleteTodo = useSetRecoilState(deleteTodo(todo.id));
  const setUpdateTodo = useSetRecoilState(updateTodo(todo.id));
  const setToggleTodo = useSetRecoilState(toggleTodo(todo.id));
  const [active, setActive] = useState(false);

  const {
    id,
    fields: { description, completed },
  } = todo;

  return (
    <Paper elevation={4} sx={{ px: 2, my: 1, border: active && "2px solid", borderColor: "primary.main" }}>
      <Input
        value={description}
        onChange={e => setUpdateTodo(e.target.value)}
        fullWidth
        disableUnderline
        onBlur={() => setActive(false)}
        onFocus={() => setActive(true)}
        style={{ textDecoration: completed && "line-through 2px gray", color: completed && "gray" }}
        startAdornment={<Checkbox onChange={setToggleTodo} checked={completed} />}
        endAdornment={
          <IconButton variant="contained" color="error" onClick={setDeleteTodo}>
            <Delete />
          </IconButton>
        }
      />
    </Paper>
  );
};

{
  /* <<Input
          value={description}
          onChange={e => setUpdateTodo(e.target.value)}
          fullWidth
          disableUnderline
          onClick={() => setActive(true)}
          onBlur={() => setActive(false)}
          style={{ textDecoration: completed && "line-through 2px gray", color: completed && "gray" }}
        />
        InputProps={{
        startAdornment:({
        <Checkbox edge="end" onChange={setToggleTodo} checked={completed} inputProps={{ "aria-labelledby": id }} />
        })
          endAdornment: (
          <IconButton variant="contained" color="error" onClick={setDeleteTodo}>
          <Delete />
        </IconButton>
          ),
        }}
      /> */
}

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm(
) {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
        <li className="list-group-item">
          <input
            value={todo.title}
            onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
          />
          
        <div className="button-group">
          <button onClick={() => dispatch(updateTodo(todo))} className="update-button" id="wd-update-todo-click">
            Update
          </button>
          <button onClick={() => dispatch(addTodo(todo))} className="add-button" id="wd-add-todo-click">
            Add
          </button>
          


        </div>
      </li>
    );
  }
  
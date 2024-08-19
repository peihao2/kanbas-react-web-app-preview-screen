import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

interface Todo {
    id: string;
    title: string;
  }

export default function TodoItem({ todo }: { todo: Todo }) {
    const dispatch = useDispatch();
    
    return (
    <li className="list-group-item">
      <span style={{ flexGrow: 1 }}>{todo.title}</span>
      <div className="button-group">
        <button onClick={() => dispatch(setTodo(todo))} className="edit-button" id="wd-set-todo-click">
          Edit
        </button>
        <button onClick={() => dispatch(deleteTodo(todo.id))} className="delete-button" id="wd-delete-todo-click">
          Delete
        </button>
      </div>
    </li>
  );
}
  
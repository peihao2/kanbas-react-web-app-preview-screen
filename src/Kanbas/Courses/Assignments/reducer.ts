// /Users/phoebelin/2024/summer/webdev/kanbas-react-web-app/src/Kanbas/Courses/Assignments/reducer.ts

import { createSlice } from "@reduxjs/toolkit";
import { Assignment } from "./types";

interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState  = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {

    setAssignment: (state, action) => {
      state.assignments = action.payload;
    },


    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: new Date().getTime().toString(),
        title: assignment.title,
        description: assignment.description,
        course: assignment.course,
        due: assignment.due,
        available: assignment.available,
        until: assignment.until,
        points: assignment.points,
        editing: false,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id ? assignment : a
      ) as any;
    },
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      ) as any;
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, editAssignment, setAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;

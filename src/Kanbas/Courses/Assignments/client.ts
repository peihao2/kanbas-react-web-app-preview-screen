import axios from "axios";
import { Assignment } from "./types";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const fetchAssignments = async (courseId: string): Promise<Assignment[]> => {
  const { data } = await axios.get(`${REMOTE_SERVER}/api/courses/${courseId}/assignments`);
  return data;
};

export const createAssignment = async (courseId: string, assignment: Omit<Assignment, "_id">): Promise<Assignment> => {
  const response = await axios.post(`${REMOTE_SERVER}/api/courses/${courseId}/assignments`, assignment);
  return response.data;
};

export const deleteAssignment = async (id: string): Promise<void> => {
  await axios.delete(`${ASSIGNMENTS_API}/${id}`);
};

export const updateAssignment = async (assignment: Assignment): Promise<Assignment> => {
  const response = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return response.data;
};


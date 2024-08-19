import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { addAssignment, setAssignment, updateAssignment, deleteAssignment } from "./reducer";
import { Assignment } from "./types";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./AssignmentControls";
import BannerControlButtons from "./BannerControlButtons";
import { FaSearch } from "react-icons/fa";
import * as client from "./client";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const assignments = useSelector((state: RootState) => state.assignments.assignments.filter(assignment => assignment.course === cid));
  const dispatch = useDispatch();
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  const fetchAssignments = async () => {
    if (cid) {
      const fetchedAssignments = await client.fetchAssignments(cid);
      dispatch(setAssignment(fetchedAssignments));
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid, dispatch]);

  const handleAddAssignment = async () => {
    if (cid) {
      const newAssignment = await client.createAssignment(cid, { 
        title: assignmentTitle, 
        description: "", 
        points: 100, 
        due: "", 
        available: "", 
        until: "",
        course: cid 
      });
      dispatch(addAssignment(newAssignment));
      setAssignmentTitle("");
    }
  };

  const saveAssignment = async (assignment: Assignment) => {
    await client.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  const handleDeleteClick = (id: string) => {
    setAssignmentToDelete(id);
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (assignmentToDelete) {
      await client.deleteAssignment(assignmentToDelete);
      dispatch(deleteAssignment(assignmentToDelete));
    }
    setShowConfirmDialog(false);
    setAssignmentToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
    setAssignmentToDelete(null);
  };

  return (
    <div id="wd-assignments">
      <div className="header-row">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            id="wd-search-assignment"
            placeholder="Search..."
            className="search-input"
          />
        </div>
        <AssignmentControls 
          assignmentTitle={assignmentTitle}
          setAssignmentTitle={setAssignmentTitle}
          addAssignment={handleAddAssignment}
        />
      </div>

      <ul id="wd-assignment" className="list-group rounded-0">
        <li className="wd-assignment list-group-item p-0 mb-5 fs-5 border-gray green-border-left">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS
            </div>
            <BannerControlButtons />
          </div>

          <ul className="wd-assignment list-group rounded-0">
            {assignments.map((assignment: Assignment) => (
              <li key={assignment._id} className="wd-assignment list-group-item p-3 ps-1 d-flex align-items-center green-border-left">
                <BsGripVertical className="me-2 fs-3" />
                
                <div className="flex-grow-1">
                  {!assignment.editing ? (
                    <a className="wd-assignment-link text-black no-underline" href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                      <b>{assignment.title}</b>
                    </a>
                  ) : (
                    <input
                      className="form-control w-50 d-inline-block"
                      onChange={(e) =>
                        dispatch(updateAssignment({ ...assignment, title: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveAssignment({ ...assignment, editing: false });
                        }
                      }}
                      value={assignment.title}
                    />
                  )}
                  <br />
                  <span className="smaller-text">
                    <span className="text-red">Multiple Modules </span>
                    <b> | Due</b> {new Date(assignment.due).toLocaleDateString()} at {new Date(assignment.due).toLocaleTimeString()} | {assignment.points} pts
                  </span>
                </div>
                <AssignmentControlButtons assignmentId={assignment._id} onDelete={handleDeleteClick} />
              </li>
            ))}
          </ul>
        </li>
      </ul>
                  
      {showConfirmDialog && (
        <div className="confirm-dialog">
          <p>Are you sure you want to remove the assignment?</p>
          <button className="btn btn-danger" onClick={handleConfirmDelete}>Yes</button>
          <button className="btn btn-secondary" onClick={handleCancelDelete}>No</button>
        </div>
      )}
    </div>
  );
}

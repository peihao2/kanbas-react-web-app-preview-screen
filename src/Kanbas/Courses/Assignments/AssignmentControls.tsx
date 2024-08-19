import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

export default function AssignmentControls({ assignmentTitle, setAssignmentTitle, addAssignment }: { assignmentTitle: string; setAssignmentTitle: (title: string) => void; addAssignment: () => void; }) {
  const navigate = useNavigate();

  const handleAddAssignment = () => {
    navigate('Editor');
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleAddAssignment}>
        <FaPlus /> Assignment
      </button>
    </div>
  );
}

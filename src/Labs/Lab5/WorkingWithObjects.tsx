import React, { useState } from "react";
import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 70,
  });
  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`

  const [module, setModule] = useState({
    id: 1,
    name: "Introduction to Machine Learning",
    description: "Learn the basics of ML",
    course: "Machine Learning",
  });
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <input className="form-control w-75" id="wd-assignment-title"
        value={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />

      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>

      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>

      <h4>Modifying Score</h4>
      <a id="wd-update-assignment-score"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
        Update Score
      </a>
      <input className="form-control w-75" id="wd-assignment-score"
        value={assignment.score} onChange={(e) =>
          setAssignment({ ...assignment, score: Number(e.target.value) })}/>
      <hr />

      <h4>Retrieving Score</h4>
      <a id="wd-retrieve-assignment-score" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment/score`}>
        Get Score
      </a><hr/>

      <h4>Modifying Assignment Completed Status</h4>
      <a id="wd-update-assignment-completed"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
        Update Completed Status
      </a>
      <input className="form-check-input" id="wd-assignment-completed" type="checkbox"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: Boolean(e.target.value) })}/>
      <hr />

      <h4>Retrieving Completed Status</h4>
      <a id="wd-retrieve-assignment-completed" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment/completed`}>
        Get Completed Status
      </a><hr/>


      <h4>Modifying Modules Name</h4>
      <a id="wd-update-module-name"
         className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/name/${module.name}`}>
        Update Name
      </a>
      <input className="form-control w-75" id="wd-module-name"
        value={module.name} onChange={(e) =>
          setModule({ ...module, name: e.target.value })}/>
      <hr />

      <h4>Retrieving Modules</h4>
      <a id="wd-retrieve-modules" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/module`}>
        Get Modules
      </a><hr/>

      <h4>Retrieving Module Name</h4>
      <a id="wd-retrieve-module-name" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/module/name`}>
        Get Module Name
      </a><hr/>


      <h4>Modifying Modules Description</h4>
      <a id="wd-update-module-description"
         className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/description/${module.description}`}>
        Update Modules description
      </a>
      <input className="form-control w-75" id="wd-module-description"
        value={module.description} onChange={(e) =>
          setModule({ ...module, description: e.target.value })}/>
      <hr />

      <h4>Retrieving Module Description</h4>
      <a id="wd-retrieve-module-description" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/module/description`}>
        Get Module Description
      </a><hr/>

    </div>
);}


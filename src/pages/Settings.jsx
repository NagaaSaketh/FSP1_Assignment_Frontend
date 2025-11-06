import { useState } from "react";
import SideBar from "../components/Sidebar";
import useTagContext from "../contexts/TagContext";
import { ToastContainer, Slide } from "react-toastify";
import useProjectContext from "../contexts/ProjectsContext";
import useTeamContext from "../contexts/TeamContext";
import useTaskContext from "../contexts/TaskContext";
const Settings = () => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const { createTags } = useTagContext();
  const { projects,deleteProject } = useProjectContext();
  const { teams,deleteTeam } = useTeamContext();
  const { tasks,deleteTask } = useTaskContext();

  const handleCreateTag = () => {
    createTags(name);
    setName("");
    setShowModal(false);
  };
 
  return (
    <div className="d-flex min-vh-100 bg-light">
      <SideBar />
      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        <div className="bg-white border-bottom">
          <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold mb-1">Settings</h2>
                <p className="text-muted mb-0">
                  Add Tags / Delete Tags, Tasks, Projects, Teams
                </p>
              </div>
              <button
                className="btn btn-primary px-4"
                onClick={() => setShowModal(true)}
              >
                + Create Tags
              </button>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h4 className="mb-4 fw-bold text-dark">Delete Tasks</h4>
          {tasks && tasks.length > 0 ? (
            <div className="list-group shadow-sm rounded-3">
              {tasks.map((t) => (
                <div
                  key={t._id}
                  className="list-group-item d-flex align-items-center justify-content-between"
                >
                  <span className="fw-medium">{t.name}</span>
                  <button onClick={()=>deleteTask(t._id)} className="btn btn-danger btn-sm px-3">Delete</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">No tasks found</p>
          )}
        </div>
        <div className="p-4">
          <h4 className="mb-4 fw-bold text-dark">Delete Projects</h4>
          {projects && projects.length > 0 ? (
            <div className="list-group shadow-sm rounded-3">
              {projects.map((p) => (
                <div
                  key={p._id}
                  className="list-group-item d-flex align-items-center justify-content-between"
                >
                  <span className="fw-medium">{p.name}</span>
                  <button onClick={()=>deleteProject(p._id)} className="btn btn-danger btn-sm px-3">Delete</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">No projects found</p>
          )}
        </div>
        <div className="p-4">
          <h4 className="mb-4 fw-bold text-dark">Delete Teams</h4>
          {teams && teams.length > 0 ? (
            <div className="list-group shadow-sm rounded-3">
              {teams.map((t) => (
                <div
                  key={t._id}
                  className="list-group-item d-flex align-items-center justify-content-between"
                >
                  <span className="fw-medium">{t.name}</span>
                  <button onClick={()=>deleteTeam(t._id)} className="btn btn-danger btn-sm px-3">Delete</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted">No teams found</p>
          )}
        </div>
      </div>
      

      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Tags</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter tag name"
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleCreateTag}>
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </div>
  );
};

export default Settings;

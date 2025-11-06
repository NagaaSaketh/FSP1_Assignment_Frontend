import { Link, useSearchParams } from "react-router-dom";
import SideBar from "../components/Sidebar";
import useTaskContext from "../contexts/TaskContext";
import { useState,useEffect } from "react";
import useProjectContext from "../contexts/ProjectsContext";
import useTeamContext from "../contexts/TeamContext";
import useOwnerContext from "../contexts/OwnerContext";
import useTagContext from "../contexts/TagContext";
import { ToastContainer, Slide } from "react-toastify";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);
  const [proj, setProject] = useState("");
  const [taskName, setTaskName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [timeToClose, setTimeToClose] = useState("");
  const [user, setUser] = useState([]); 
  const [tag, setTag] = useState([]);

  const { tasks, createTask,fetchTasks } = useTaskContext();
  const [searchParams] = useSearchParams();
  const { projects } = useProjectContext();
  const { teams } = useTeamContext();
  const { owners } = useOwnerContext();
  const { tags } = useTagContext();

  const owner = searchParams.get("owner");
  const team = searchParams.get("team");
  const project = searchParams.get("project");

  useEffect(() => {
    fetchTasks(owner, team, project);
  }, [owner, team, project]);


  const handleCreateTask = async () => {
    await createTask(project, taskName, team, timeToClose, user, tag);
    setProject("");
    setTaskName("");
    setTeam("");
    setTimeToClose("");
    setUser([]); 
    setTag([]);
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
                <h2 className="fw-bold mb-1">Tasks</h2>
                <p className="text-muted mb-0">
                  Manage and organize your tasks
                </p>
              </div>
              <button
                className="btn btn-primary px-4"
                onClick={() => setShowModal(true)}
              >
                + Create Task
              </button>
            </div>
          </div>
        </div>
        <div className="container-fluid p-4">
          {tasks && tasks.length > 0 ? (
            <div className="row mt-3">
              {tasks.map((task) => ( 
                <div key={task._id} className="col-md-4 mb-3">
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/tasks/${task._id}`}
                  >
                    <div className="card w-100 h-100 border-0 shadow p-3">
                      <div className="d-flex flex-column align-items-center">
                        <p className="fs-5 fw-semibold">{task.name}</p>
                        <span
                          className={
                            task.status === "Completed"
                              ? "badge bg-success"
                              : task.status === "To Do"
                              ? "badge bg-primary"
                              : task.status === "In Progress"
                              ? "badge bg-warning"
                              : task.status === "Blocked" 
                              ? "badge bg-danger" 
                              : ""
                          }
                        >
                          Status: {task.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <h4 className="fw-semibold mb-2">No Tasks Yet</h4>
          )}
        </div>
      </div>
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create New Task</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <form id="createTaskForm">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Choose Project
                    </label>
                    <select
                      className="form-select"
                      value={proj}
                      onChange={(e) => proj(e.target.value)}
                      required
                    >
                      <option value="">Select a project</option>
                      {projects?.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Enter task name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      placeholder="Enter Task Name"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Choose Team
                    </label>
                    <select
                      className="form-select"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      required
                    >
                      <option value="">Select a team</option>
                      {teams?.map((t) => (
                        <option key={t._id} value={t._id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Choose Owners
                    </label>
                    <select
                      multiple
                      className="form-select"
                      value={user}
                      onChange={(e) =>
                        setUser(
                          Array.from(e.target.selectedOptions, (o) => o.value)
                        )
                      }
                      required
                    >
                      {owners?.map((o) => (
                        <option key={o._id} value={o._id}>
                          {o.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Choose Tags
                    </label>
                    <select
                      multiple
                      className="form-select"
                      value={tag}
                      onChange={(e) =>
                        setTag(
                          Array.from(e.target.selectedOptions, (t) => t.value)
                        )
                      }
                      required
                    >
                      {tags?.map((t) => (
                        <option key={t._id} value={t._id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-semibold">
                        Estimated Time to complete
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Time in Days"
                        value={timeToClose}
                        onChange={(e) => setTimeToClose(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleCreateTask}>
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

export default Tasks;
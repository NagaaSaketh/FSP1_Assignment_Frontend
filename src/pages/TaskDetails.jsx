import { useParams } from "react-router-dom";
import SideBar from "../components/Sidebar";
import useTaskContext from "../contexts/TaskContext";
import { ToastContainer, Slide, toast } from "react-toastify";
import { useEffect, useState } from "react";
import useProjectContext from "../contexts/ProjectsContext";
import useTeamContext from "../contexts/TeamContext";
import useOwnerContext from "../contexts/OwnerContext";
import useTagContext from "../contexts/TagContext";

const TaskDetails = () => {
  const [showModal, setShowModal] = useState(false);
  const [project, setProject] = useState("");
  const [taskName, setTaskName] = useState("");
  const [team, setTeam] = useState("");
  const [timeToClose, setTimeToClose] = useState("");
  const [user, setUser] = useState([]);
  const [tag, setTag] = useState([]);
  const [status, setStatus] = useState("");

  const { taskId } = useParams();
  const { updateTask, taskInfo, fetchTaskDetails } = useTaskContext();
  const { projects } = useProjectContext();
  const { teams } = useTeamContext();
  const { owners } = useOwnerContext();
  const { tags } = useTagContext();

  // ✅ Fetch task details
  useEffect(() => {
    if (taskId) fetchTaskDetails(taskId);
  }, [taskId]);

  // ✅ Pre-fill modal fields when taskInfo loads
  useEffect(() => {
    if (taskInfo) {
      setProject(taskInfo.project?._id || "");
      setTaskName(taskInfo.name || "");
      setTeam(taskInfo.team?._id || "");
      setUser(taskInfo.owners?.map((o) => o._id) || []);
      setTag(taskInfo.tags?.map((t) => t._id) || []);
      setTimeToClose(taskInfo.timeToComplete || "");
      setStatus(taskInfo.status || "");
    }
  }, [taskInfo]);

  const handleUpdateTask = async () => {
    const payload = {
      project,
      name: taskName,
      team,
      owners: user,
      tags: tag,
      timeToComplete: timeToClose,
      status,
    };

    await updateTask(taskId, payload);
    setShowModal(false);
    fetchTaskDetails(taskId);
  };

  return (
    <>
      <div className="d-flex min-vh-100 bg-light">
        <SideBar />
        <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
          <div className="bg-white border-bottom">
            <div className="container-fluid p-4 d-flex justify-content-between align-items-center">
              <h2 className="fw-bold mb-1">Task Details : {taskInfo.name}</h2>
              <button
                className="btn btn-primary px-4"
                onClick={() => setShowModal(true)}
              >
                + Edit
              </button>
            </div>
          </div>

          <div className="card shadow-sm m-2 p-4">
            <p className="fs-5 fw-semibold">Task Details:</p>
            <p>Project : {taskInfo.project?.name}</p>
            <p>Task Name : {taskInfo.name}</p>
            <p>Team : {taskInfo.team?.name}</p>
            <p>Owners : {taskInfo.owners?.map((o) => o.name).join(", ")}</p>
            <p>Tags : {taskInfo.tags?.map((t) => t.name).join(", ")}</p>
            <p>Time to Complete : {taskInfo.timeToComplete} days</p>
            <p>Status : {taskInfo.status}</p>

            {taskInfo.status !== "Completed" && (
              <button
                onClick={() =>
                  updateTask(taskInfo._id, { status: "Completed" })
                }
                className="btn btn-outline-primary w-25"
              >
                Mark as complete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ✅ EDIT MODAL */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="fw-semibold">Project</label>
                    <select
                      className="form-select"
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                    >
                      <option>Select Project</option>
                      {projects?.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="fw-semibold">Task Name</label>
                    <input
                      className="form-control"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="fw-semibold">Team</label>
                    <select
                      className="form-select"
                      value={team}
                      onChange={(e) => setTeam(e.target.value)}
                    >
                      <option>Select Team</option>
                      {teams?.map((t) => (
                        <option key={t._id} value={t._id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="fw-semibold">Owners</label>
                    <select
                      multiple
                      className="form-select"
                      value={user}
                      onChange={(e) =>
                        setUser(
                          [...e.target.selectedOptions].map((o) => o.value)
                        )
                      }
                    >
                      {owners?.map((o) => (
                        <option key={o._id} value={o._id}>
                          {o.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="fw-semibold">Tags</label>
                    <select
                      multiple
                      className="form-select"
                      value={tag}
                      onChange={(e) =>
                        setTag(
                          [...e.target.selectedOptions].map((t) => t.value)
                        )
                      }
                    >
                      {tags?.map((t) => (
                        <option key={t._id} value={t._id}>
                          {t.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="fw-semibold">Status</label>
                    <select
                      className="form-select"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Blocked">Blocked</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="fw-semibold">
                      Time to Complete (weeks)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={timeToClose}
                      onChange={(e) => setTimeToClose(e.target.value)}
                    />
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
                <button className="btn btn-primary" onClick={handleUpdateTask}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
        transition={Slide}
      />
    </>
  );
};

export default TaskDetails;

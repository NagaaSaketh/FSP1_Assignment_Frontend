import SideBar from "../components/Sidebar";
import useTeamContext from "../contexts/TeamContext";
import { ToastContainer, Slide } from "react-toastify";
import { useState } from "react";
const Teams = () => {
  const { teams, createTeam } = useTeamContext();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  console.log(teams);

  const handleCreateTeam = async () => {
    await createTeam(name, description);
    setShowModal(false);
    setName("");
    setDescription("");
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <SideBar />
      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        <div className="bg-white border-bottom">
          <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold mb-1">Teams</h2>
                <p className="text-muted mb-0">
                  Manage and organize your teams
                </p>
              </div>
              <button
                className="btn btn-primary px-4"
                onClick={() => setShowModal(true)}
              >
                + Create Team
              </button>
            </div>
          </div>
        </div>
        <div className="container-fluid p-4">
          {teams && teams.length > 0 ? (
            <div className="row mt-3">
              {teams && teams.length > 0 ? (
                teams.map((team) => (
                  <div key={team._id} className="col-md-4 mb-3">
                    <div className="card w-100 h-100 border-0 shadow p-4">
                      <p className="fs-5 fw-semibold">{team.name}</p>
                      <p className="fw-light">{team.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No Projects</p>
              )}
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
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Team</h5>
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
                    placeholder="Enter team name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    rows="3"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter project description"
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleCreateTeam}>
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

export default Teams;

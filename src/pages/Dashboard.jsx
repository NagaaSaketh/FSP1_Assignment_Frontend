import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useUserContext from "../contexts/UserContext";
import useProjectContext from "../contexts/ProjectsContext";

import SideBar from "../components/Sidebar";
import useTaskContext from "../contexts/TaskContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData } = useUserContext();
  const { projects } = useProjectContext();
  const { tasks } = useTaskContext();
  console.log(tasks);

  const [search, setSearch] = useState("");

  const filteredProjects = search
    ? projects.filter((proj) =>
        proj.name.toLowerCase().includes(search.toLowerCase())
      )
    : projects;

  const filteredTasks = search
    ? tasks.filter((task) =>
        task.name.toLowerCase().includes(search.toLowerCase())
      )
    : tasks;

  console.log(projects);
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <SideBar />
      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        <div className="bg-white border-bottom p-3">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-6">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Search"
                />
              </div>
              <div className="col-md-4 text-end">
                <p className="fw-bold mb-0">Hi, {userData?.name}</p>
              </div>
              <div className="col-md-2 text-end">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h2 className="mb-4">Dashboard Content</h2>
          <h4 className="pb-2">Projects</h4>
          <div className="row g-3">
            {filteredProjects && filteredProjects.length > 0 ? (
              filteredProjects.map((proj) => (
                <div key={proj._id} className="col-12 col-md-6 col-lg-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body p-4">
                      <h5 className="card-title fw-semibold text-dark mb-2">
                        {proj.name}
                      </h5>
                      <p className="card-text text-muted">{proj.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="text-center py-5">
                  <p className="text-muted">No Projects</p>
                </div>
              </div>
            )}
          </div>
          <div className="mt-4">
            <h4 className="pb-2">Tasks</h4>
            <div className="row g-3">
              {filteredTasks && filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <div key={task._id} className="col-12 col-md-6 col-lg-4">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body p-4">
                        <h5 className="card-title fw-semibold text-dark mb-2">
                          {task.name}
                        </h5>
                        <p className="card-text text-muted">
                          {/* {task.project} */}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12">
                  <div className="text-center py-5">
                    <p className="text-muted">No Tasks</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

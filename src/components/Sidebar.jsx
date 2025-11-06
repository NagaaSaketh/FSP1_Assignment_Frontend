import { Link } from "react-router-dom";
const SideBar = () => {
  return ( 
      <div
        className="bg-white border-end position-fixed vh-100 d-flex flex-column"
        style={{ width: "250px" }}
      >
        <div className="p-4">
          <h3 className="text-primary fw-bold mb-5">workasana</h3>
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link
                to="/dashboard"
                className="nav-link text-secondary"
              >
                Dashboard
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/projects" className="nav-link text-secondary">
                Projects
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/tasks" className="nav-link text-secondary">
                Tasks
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/teams" className="nav-link text-secondary">
                Team
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/reports" className="nav-link text-secondary">
                Reports
              </Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/settings" className="nav-link text-secondary">
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </div>
  );
};

export default SideBar;
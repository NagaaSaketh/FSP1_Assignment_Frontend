import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Link } from "react-router-dom";
function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary text-light">
        <div className="container-fluid">
          <h4 className="fs-3 fw-bold py-2">Workasana</h4>
           <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mx-4 mb-lg-0">
              <li className="nav-item ">
                <Link to="/login" className="nav-link text-light">Login</Link>
              </li>
             <li class="nav-item">
                <Link to="/signup" className="nav-link text-light">SignUp</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
       <div className="text-center mt-5 pt-5">
          <h1 className="fw-bold" style={{fontFamily:"TimesNewRoman"}}>Welcome to Workasana!</h1>
        </div>
    </>
  );
}

export default App;

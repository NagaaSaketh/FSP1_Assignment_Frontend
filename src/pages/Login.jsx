import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import useLoginContext from "../contexts/LoginContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { email, setEmail, pass, setPass, handleLogin } = useLoginContext();

  const handleLoginBtn = async (e) => {
    e.preventDefault();
    const success = await handleLogin();
    if(success){
      navigate("/dashboard")
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-primary-emphasis">workasana</h2>
            </div>
            <div className="card  border-0">
              <div className="card-body p-4">
                <h4 className="text-center mb-2 fw-bold">
                  Log in to your account
                </h4>
                <p className="text-center text-muted mb-4">
                  Please enter your details.
                </p>
                <form onSubmit={handleLoginBtn}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-medium">
                      Email
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="text"
                      value={email}
                      className="form-control"
                      id="email"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-medium">
                      Password
                    </label>
                    <div className="position-relative">
                      <input
                        onChange={(e) => setPass(e.target.value)}
                        value={pass}
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-muted"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ textDecoration: "none" }}
                      >
                        {showPassword ? (
                          <img
                            style={{ width: "15px", height: "15px" }}
                            src="https://www.svgrepo.com/show/380010/eye-password-show.svg"
                          />
                        ) : (
                          <img
                            style={{ width: "15px", height: "15px" }}
                            src="https://www.svgrepo.com/show/380007/eye-password-hide.svg"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary w-100">
                      Login
                    </button>
                  </div>
                  <div className="text-center mt-3">
                    <span className="text-muted">Don't have account ? </span>
                    <Link to="/signup" className="text-decoration-none">
                      Create account
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default Login;

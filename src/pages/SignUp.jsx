import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import useSignUpContext from "../contexts/SignUpContext";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { email, setEmail, pass, setPass, name, setName, handleSignUp } =
    useSignUpContext();

  const handleSignUpBtn = async (e) => {
    e.preventDefault();
    const success = await handleSignUp();
    setTimeout(()=>{
      if(success){
        navigate("/login")
      }
    },4000)
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
                  Create a new account
                </h4>
                <p className="text-center text-muted mb-4">
                  Please enter your details.
                </p>
                <form onSubmit={handleSignUpBtn}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-medium">
                      Name
                    </label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      value={name}
                      className="form-control"
                      id="name"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-medium">
                      Email
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
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
                            alt="Hide password"
                          />
                        ) : (
                          <img
                            style={{ width: "15px", height: "15px" }}
                            src="https://www.svgrepo.com/show/380007/eye-password-hide.svg"
                            
                            alt="Show password"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary w-100">
                      Sign Up
                    </button>
                  </div>
                  <div className="text-center mt-3">
                    <span className="text-muted">
                      Already have an account?{" "}
                    </span>
                    <Link to="/login" className="text-decoration-none">
                      Log in
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

export default SignUp;

import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import useUserContext from "./UserContext";
const LoginContext = createContext();

const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const { fetchData } = useUserContext();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async () => {
    if (!email) {
      toast.error("Please enter email address");
      return false;
    }
    if (!email.includes("@")) {
      toast.error("Please enter valid email address");
      return false;
    }
    if (!pass) {
      toast.error("Please enter password");
      return false;
    }

    try {
      const response = await fetch("https://fsp-1-assignment-backend.vercel.app/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: pass }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.error);
        toast.error("Invalid Email / Password");
        return false;
      }

      if (!data.token) {
        toast.error("Invalid password");
        return false;
      }

      console.log("Login Succesful", data);
      localStorage.setItem("userToken", data.token);
      toast.success("Login successful");

      await fetchData();

      setEmail("");
      setPass("");

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("userToken");
    toast.info("Logged out successfully.");
  };

  return (
    <LoginContext.Provider
      value={{ email, setEmail, pass, setPass, handleLogin, handleLogOut }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default useLoginContext;

import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
const SignUpContext = createContext();

const useSignUpContext = () => useContext(SignUpContext);

export const SignUpProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async () => {
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
    if (!name) {
      toast.error("Please enter name");
      return false;
    }

    const newUser = {
      name,
      email,
      password: pass,
    };

    try {
      const response = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to create account.");
      }

      console.log("Account Created", data);
      toast.success("Account created successfully");
      setName("");
      setEmail("");
      setPass("");
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  return (
    <SignUpContext.Provider
      value={{ email, setEmail, pass, setPass, name, setName, handleSignUp }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export default useSignUpContext;

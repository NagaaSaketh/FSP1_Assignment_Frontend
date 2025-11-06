import { createContext, useContext,useState, useEffect } from "react";
import { toast } from "react-toastify";
const UserContext = createContext();

const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      return;
    }
    try {
      setError(null);
      const response = await fetch("https://fsp-1-assignment-backend.vercel.app/auth/me", {
        method:"GET",
        headers: {
          Authorization: `${token}`,
          "Content-Type":"application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        if(response.status===401 || response.status === 403){
          localStorage.removeItem("userToken");
          localStorage.removeItem("userName");
          setUserData(null);
          toast.error("Session Expired , Please login again")
        }else{
          setError(data.error);
        }
        return;
      }
      
      console.log("User data",data);
      setUserData(data);
    } catch (err) {
      console.log(err);
      setError("Failed to load user");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, error ,fetchData }}>
      {children}
    </UserContext.Provider>
  );
};

export default useUserContext;

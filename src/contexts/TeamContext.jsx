import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const TeamContext = createContext();

const useTeamContext = () => useContext(TeamContext);

export const TeamProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const fetchTeams = async () => {
    const token = localStorage.getItem("userToken");
    try {
      const response = await fetch("http://localhost:4000/teams", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch teams");
      }
      console.log("Teams", data);
      setTeams(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

    
  const createTeam = async(name,description)=>{
    if(!name){
      return toast.warning("Please enter team name")
    }
    if(!description){
      return toast.warning("Please enter description")
    }
    const token = localStorage.getItem("userToken");
    try{
      const newTeam = {
        name,
        description
      }

      const response = await fetch("http://localhost:4000/teams",{
        method:"POST",
        headers:{
          Authorization:`Bearer ${token}`,
          "Content-Type":"application/json",
        },
        body:JSON.stringify(newTeam)
      })
      const data = await response.json();
      if(!response.ok){
        throw new Error("Failed to create a new team.")
      }
      console.log("Added team",data);
      await fetchTeams();
      toast.success("Team created successfully")

    }catch(err){
      console.log(err);
      throw err;
    } 
  }
  const deleteTeam = async (teamId) => {
    if (!teamId) return;
    try {
      const response = await fetch(
        `http://localhost:4000/teams/${teamId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to delete team");
      }
      console.log("Team deleted", data);
      setTeams((prevVal) =>
        prevVal.filter((team) => team._id !== teamId)
      );
      toast.success("Team deleted successfully");
      await fetchTeams();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };



  return (
    <TeamContext.Provider value={{ teams,createTeam,deleteTeam }}>{children}</TeamContext.Provider>
  );
};

export default useTeamContext;

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProjectContext = createContext();

const useProjectContext = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const fetchProjects = async () => {
    try {
      const response = await fetch("https://fsp-1-assignment-backend.vercel.app/projects", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      setProjects(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (name, description) => {
    if (!name) {
      toast.warning("Please enter project name");
      return;
    }
    if (!description) {
      toast.warning("Please enter project description");
      return;
    }
    try {
      const token = localStorage.getItem("userToken");
      const newProject = {
        name,
        description,
      };
      const response = await fetch("https://fsp-1-assignment-backend.vercel.app/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProject),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to create project");
      }
      await fetchProjects();
      console.log("New Project", data);
      toast.success("Project added successfully");
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  const deleteProject = async (projectId) => {
    if (!projectId) return;
    try {
      const response = await fetch(
        `https://fsp-1-assignment-backend.vercel.app/projects/${projectId}`,
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
        throw new Error("Failed to delete project");
      }
      console.log("Project deleted", data);
      setProjects((prevVal) =>
        prevVal.filter((proj) => proj._id !== projectId)
      );
      toast.success("Project deleted successfully");
      await fetchProjects();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        createProject,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default useProjectContext;

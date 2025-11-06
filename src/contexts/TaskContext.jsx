import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const TaskContext = createContext();

const useTaskContext = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [taskInfo, setTaskInfo] = useState("");
  const token = localStorage.getItem("userToken");

  const fetchTasks = async (owner = null, team = null, project = null) => {
    try {
      let query = [];

      if (owner) {
        query.push(`owner=${owner}`);
      }
      if (team) {
        query.push(`team=${team}`);
      }
      if (project) {
        query.push(`project=${project}`);
      }

      const queryString = query.length != 0 ? `?${query.join("&")}` : "";
      const response = await fetch(
        `http://localhost:4000/tasks${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      console.log("Tasks", data);
      setTasks(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const fetchTaskDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      console.log("Tasks", data);
      setTaskInfo(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  const createTask = async (
    project,
    taskName,
    team,
    timeToClose,
    user,
    tag
  ) => {
    if (!project) {
      toast.warning("Please select task");
    }
    if (!taskName) {
      toast.warning("Enter task name");
    }
    if (!team) {
      toast.warning("Please select team");
    }
    if (!timeToClose) {
      toast.warning("Please enter time to close");
    }
    if (!user) {
      toast.warning("Please select owners");
    }
    if (!tag) {
      toast.warning("Please select tags");
    }
    try {
      const token = localStorage.getItem("userToken");
      const newTask = {
        name: taskName,
        project,
        team,
        owners: user,
        tags: tag,
        timeToComplete: timeToClose,
      };
      const response = await fetch("http://localhost:4000/tasks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to create new task");
      }
      console.log("Added task", data);
      await fetchTasks();
      toast.success("Task created successfully");
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const updateTask = async (id, updatedData) => {
    if (!id) return;
    if (!updatedData) return;
    try {
      const response = await fetch(`http://localhost:4000/tasks/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      console.log("Updated task", data);
      await fetchTasks();
      await fetchTaskDetails(id);
      toast.success("Task updated successfully");
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  const deleteTask = async (taskId) => {
    if (!taskId) return;
    try {
      const response = await fetch(`http://localhost:4000/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      console.log("Task deleted", data);
      setTasks((prevVal) => prevVal.filter((task) => task._id !== taskId));
      toast.success("Task deleted successfully");
      await fetchTasks();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        taskInfo,
        fetchTaskDetails,
        createTask,
        updateTask,
        deleteTask,
        fetchTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default useTaskContext;

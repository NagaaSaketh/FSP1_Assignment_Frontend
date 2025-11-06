import { createContext, useContext, useState, useEffect } from "react";

const ReportContext = createContext();

const useReportContext = () => useContext(ReportContext);

export const ReportProvider = ({ children }) => {
  const [tasksClosed, setTasksClosed] = useState([]);
  const [daysPending, setDaysPending] = useState({
    totalDays: 0,
    taskCount: 0,
  });
  const [tasksClosedByTeam, setTasksClosedByTeam] = useState("");
  const [tasksClosedByOwner, setTasksClosedByOwner] = useState("");
  const fetchTasksClosed = async () => {
    try {
      const response = await fetch("http://localhost:4000/report/last-week", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      setTasksClosed(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const workPending = async () => {
    try {
      const response = await fetch("http://localhost:4000/report/pending", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch days pending");
      }
      setDaysPending(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const fetchTasksClosedByTeam = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/report/closed-tasks",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch tasks closed by team");
      }
      setTasksClosedByTeam(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  const fetchTasksClosedByOwner = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/report/closed-tasks?groupBy=owner",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch tasks closed by owner");
      }
      setTasksClosedByOwner(data);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return (
    <ReportContext.Provider
      value={{
        tasksClosed,
        fetchTasksClosed,
        daysPending,
        workPending,
        tasksClosedByTeam,
        fetchTasksClosedByTeam,
        tasksClosedByOwner,
        fetchTasksClosedByOwner,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export default useReportContext;

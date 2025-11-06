import SideBar from "../components/Sidebar";
import { Bar } from "react-chartjs-2";
import { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import useReportContext from "../contexts/ReportContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

const Reports = () => {
  const {
    tasksClosed,
    fetchTasksClosed,
    daysPending,
    workPending,
    tasksClosedByTeam,
    fetchTasksClosedByTeam,
    tasksClosedByOwner,
    fetchTasksClosedByOwner,
  } = useReportContext();

  console.log(tasksClosedByTeam);
  console.log(tasksClosedByOwner);

  useEffect(() => {
    fetchTasksClosed();
    workPending();
    fetchTasksClosedByTeam();
    fetchTasksClosedByOwner();
  }, []);

  const completedCount = tasksClosed.filter(
    (t) => t.status === "Completed"
  ).length;

  const barData = {
    labels: ["Completed"],
    datasets: [
      {
        label: "Tasks",
        data: [completedCount],
        backgroundColor: ["#4caf50"],
      },
    ],
  };

  const pendingBarData = {
    labels: ["Pending Report"],
    datasets: [
      {
        label: "Total Days Pending",
        data: [daysPending.totalDays],
        backgroundColor: "#f44336",
      },
      {
        label: "Pending Tasks",
        data: [daysPending.taskCount],
        backgroundColor: "#ff9800",
      },
    ],
  };

  const teamBarData = {
    labels:
      tasksClosedByTeam?.results?.map((item) => item.name || "Unnamed Team") ||
      [],
    datasets: [
      {
        label: "Closed Tasks",
        data:
          tasksClosedByTeam?.results?.map((item) => item.completedTaskCount) ||
          [],
        backgroundColor: "#2196f3",
      },
    ],
  };

  const ownerBarData = {
    labels:
      tasksClosedByOwner?.results?.map((item) => item.name || "Unknown") || [],
    datasets: [
      {
        label: "Closed Tasks",
        data:
          tasksClosedByOwner?.results?.map((item) => item.completedTaskCount) ||
          [],
        backgroundColor: "#9c27b0",
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: "Work Reports Overview",
        font: { size: 18 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="d-flex min-vh-100 bg-light">
      <SideBar />

      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>

        <div className="bg-white border-bottom vw-100">
          <div className="container-fluid p-4">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold mb-1">Reports</h2>
                <p className="text-muted mb-0">View insights of reports</p>
              </div>
            </div>
          </div>
        </div>

        {/* Completed Work */}
        <div className="p-4">
          <p className="fs-4 fw-semibold mb-4">Total work done last week</p>
          <div style={{ width: "600px", height: "350px", margin: "0 auto" }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>


        <div className="p-4">
          <p className="fs-4 fw-semibold mb-4">Total days of work pending</p>
          <div style={{ width: "600px", height: "350px", margin: "0 auto" }}>
            <Bar data={pendingBarData} options={barOptions} />
          </div>
        </div>


        <div className="p-4">
          <p className="fs-4 fw-semibold mb-4">Tasks Closed by Team</p>
          <div style={{ width: "800px", height: "400px", margin: "0 auto" }}>
            <Bar data={teamBarData} options={barOptions} />
          </div>
        </div>

        <div className="p-4">
          <p className="fs-4 fw-semibold mb-4">Tasks Closed by Owner</p>
          <div style={{ width: "800px", height: "400px", margin: "0 auto" }}>
            <Bar data={ownerBarData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

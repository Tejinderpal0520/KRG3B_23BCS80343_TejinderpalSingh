import { logs } from "../data/logs";

const Dashboard = () => {
  const totalEmission = logs.reduce((total, log) => total + log.carbon, 0);

  return (
    <div>
      <h2 style={{color: "#d0b323"}}>Carbon Dashboard</h2>

      {logs.map((log) => (
        <p key={log.id}>
          {log.activity}: {log.carbon} kg CO₂
        </p>
      ))}

      <hr />

      <h3 style={{color: "#3a8cff"}}>Total Emission: {totalEmission} kg CO₂</h3>
      <hr />
    </div>
  );
};

export default Dashboard;
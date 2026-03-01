import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className="page">
        <div className="card">
          <h2>Welcome to EcoTrack Dashboard</h2>
          <p>Track your daily hydration and stay healthy.</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
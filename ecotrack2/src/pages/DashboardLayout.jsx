import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";

const DashboardLayout = () => {
  return (
    <>
      <Header />

      <nav>
        <Link to="summary">Summary</Link> |{" "}
        <Link to="analytics">Analytics</Link>
      </nav>

      <hr />

      <Outlet />
    </>
  );
};

export default DashboardLayout;

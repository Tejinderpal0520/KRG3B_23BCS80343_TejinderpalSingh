import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/login";
import DashboardAnalytics from "./pages/DashboardAnalytics";
import DashboardSummary from "./pages/DashboardSummary";
import DashboardLayout from "./pages/DashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardSummary />} />
          <Route path="/summary" element={<DashboardSummary />} />
          <Route path="/analytics" element={<DashboardAnalytics />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

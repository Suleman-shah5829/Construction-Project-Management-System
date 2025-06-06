import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import "C:/Users/PMLS/Documents/CONSTRUCTION App/frontend/src/common/TableListStyling.css";
import "./common/TableListStyling.css";
// import "C:/Users/PMLS/Documents/CONSTRUCTION App/frontend/src/common/NewFormStyling.css";
import "./common/NewFormStyling.css";
// import "C:/Users/PMLS/Documents/CONSTRUCTION App/frontend/src/common/EditFormStyling.css";
import "./common/EditFormStyling.css";
// import "C:/Users/PMLS/Documents/CONSTRUCTION App/frontend/src/common/DetailsCard.css";
import "./common/DetailsCard.css";
import DashboardPage from "./pages/DashboardPage";
import ProjectPage from "./pages/ProjectPage";
import TaskPage from "./pages/TaskPage";
import EmployeePage from "./pages/EmployeePage";
import ExpensePage from "./pages/ExpensePage";
import InventoryPage from "./pages/InventoryPage";
import SupplierPage from "./pages/SupplierPage";
import ProjectResourcesPage from "./pages/ProjectResourcesPage";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer"; // Import Footer component
import ProjectForm from "./components/Projects/ProjectForm";
import ProjectUpdate from "./components/Projects/ProjectUpdate";
import SuppliersForm from "./components/Suppliers/SuppliersForm";
import SuppliersUpdate from "./components/Suppliers/SuppliersUpdate";
import InventoryForm from "./components/Inventory/InventoryForm";
import InventoryUpdate from "./components/Inventory/InventoryUpdate";
import InventoryDetail from "./components/Inventory/InventoryDetail";
import ProjectDetails from "./components/Projects/ProjectDetails";
import EmployeeDetail from "./components/Employees/EmployeeDetail";
import EmployeeForm from "./components/Employees/EmployeeForm";
import EmployeeUpdate from "./components/Employees/EmployeeUpdate";
import TaskForm from "./components/Tasks/TaskForm";
import TaskDetails from "./components/Tasks/TaskDetail";
import TaskUpdate from "./components/Tasks/TaskUpdate";
import ExpenseDetails from "./components/Expenses/ExpenseDetails";
import ExpenseForm from "./components/Expenses/ExpenseForm";
import ExpenseUpdate from "./components/Expenses/ExpenseUpdate";
import ProjectResourcesForm from "./components/projectResources/ProjectResourcesForm";
import ProjectResourcesUpdate from "./components/projectResources/ProjectResourcesUpdate";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { useAuth } from "./components/Auth/AuthContext";
import ChangePassword from "./components/Auth/ChangePassword";
import AuthLayout from "./components/Auth/AuthLayout";
import DocumentUploadModal from "./components/DocumentUploadModal/DocumentUploadModal";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      {user && <Navbar />}
      <main className="main-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="content pt-4">
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />

                  {/* Show welcome page with login/signup options for root path */}
                  <Route
                    path="/"
                    element={user ? <DashboardPage /> : <AuthLayout />}
                  />

                  {/* Protected routes */}
                  <Route element={<ProtectedRoute />}>
                    {/* ... change password ... */}
                    <Route
                      path="/change-password"
                      element={<ChangePassword />}
                    />
                    {/* Projects */}

                    <Route path="/projects" element={<ProjectPage />} />
                    <Route path="/projects/new" element={<ProjectForm />} />
                    <Route
                      path="/projects/update/:id"
                      element={<ProjectUpdate />}
                    />
                    <Route
                      path="/projects/detail/:id"
                      element={<ProjectDetails />}
                    />
                    {/* Tasks */}
                    <Route path="/tasks" element={<TaskPage />} />
                    <Route path="/tasks/new" element={<TaskForm />} />
                    <Route path="/tasks/detail/:id" element={<TaskDetails />} />
                    <Route path="/tasks/update/:id" element={<TaskUpdate />} />
                    {/* Expenses */}
                    <Route path="/expenses" element={<ExpensePage />} />
                    <Route path="/expenses/new" element={<ExpenseForm />} />
                    <Route
                      path="/expenses/detail/:id"
                      element={<ExpenseDetails />}
                    />
                    <Route
                      path="/expenses/update/:id"
                      element={<ExpenseUpdate />}
                    />
                    {/* Suppliers */}
                    <Route path="/suppliers" element={<SupplierPage />} />
                    <Route path="/suppliers/new" element={<SuppliersForm />} />
                    <Route
                      path="/suppliers/update/:id"
                      element={<SuppliersUpdate />}
                    />
                    {/* <Route
                  path="/suppliers/detail/:id"
                  element={<SuppliersDetail />}
                /> */}
                    {/* Inventory */}
                    <Route path="/inventory" element={<InventoryPage />} />
                    <Route path="/inventory/new" element={<InventoryForm />} />
                    <Route
                      path="/inventory/update/:id"
                      element={<InventoryUpdate />}
                    />
                    <Route
                      path="/inventory/detail/:id"
                      element={<InventoryDetail />}
                    />
                    {/* Employees */}
                    <Route path="/employees" element={<EmployeePage />} />
                    <Route path="/employees/new" element={<EmployeeForm />} />
                    <Route
                      path="/employees/update/:id"
                      element={<EmployeeUpdate />}
                    />
                    <Route
                      path="/employees/detail/:id"
                      element={<EmployeeDetail />}
                    />
                    {/* ProjectResources */}
                    <Route
                      path="/ProjectResources"
                      element={<ProjectResourcesPage />}
                    />
                    <Route
                      path="/ProjectResources/new"
                      element={<ProjectResourcesForm />}
                    />
                    <Route
                      path="/ProjectResources/update/:id"
                      element={<ProjectResourcesUpdate />}
                    />
                  </Route>

                  {/* Redirect unauthorized routes to home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </main>
      {user && <Footer />}
    </div>
  );
}

export default App;

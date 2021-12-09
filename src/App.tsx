import "./assets/scss/App.scss";
import { createRef, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { SnackbarProvider } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

// Importing Layouts - Mudasir Nizamani
import AuthLayout from "./core/layouts/AuthLayout";
import AdminLayout from "./core/layouts/AdminLayout";
import CreateDepartment from "./features/admin/pages/Departments/CreateDepartment";

// Importing Auth Pages - Mudasir Nizamani
const AuthSignin = lazy(() => import("./features/auth/pages/Signin"));
const AuthAdmin = lazy(() => import("./features/auth/pages/Admin"));
const AuthDean = lazy(() => import("./features/auth/pages/Dean"));

// Importing Admin Pages - Mudasir Nizamani
const AdminIndex = lazy(() => import("./features/admin/pages/Index"));
const AdminProfile = lazy(() => import("./features/admin/pages/Profile"));
const AdminSettings = lazy(() => import("./features/admin/pages/Settings"));
const AdminUsers = lazy(() => import("./features/admin/pages/Users/Users"));
const AdminUser = lazy(() => import("./features/admin/pages/Users/User"));
const AdminFaculties = lazy(
  () => import("./features/admin/pages/Faculties/Faculties")
);
const AdminFaculty = lazy(
  () => import("./features/admin/pages/Faculties/Faculty")
);
const AdminCreateFaculty = lazy(
  () => import("./features/admin/pages/Faculties/CreateFaculty")
);
const AdminDepartments = lazy(
  () => import("./features/admin/pages/Departments/Departments")
);
const AdminDepartment = lazy(
  () => import("./features/admin/pages/Departments/Department")
);
const AdminCreateDepartment = lazy(
  () => import("./features/admin/pages/Departments/CreateDepartment")
);

function App() {
  const toastRef = createRef<any>();

  const closeToast = (key: any) => () => {
    toastRef.current.closeSnackbar(key);
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<h2>plz wait loading</h2>}>
              <SnackbarProvider
                maxSnack={3}
                ref={toastRef}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                action={(key: any) => (
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={closeToast(key)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              >
                <AuthLayout />
              </SnackbarProvider>
            </Suspense>
          }
        >
          <Route index element={<AuthSignin />} />
          <Route path="auth/admin" element={<AuthAdmin />} />
          <Route path="auth/dean" element={<AuthDean />} />
        </Route>

        <Route
          path="/admin"
          element={
            <Suspense fallback={<h2>plz wait loading</h2>}>
              <SnackbarProvider
                maxSnack={3}
                ref={toastRef}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                action={(key: any) => (
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={closeToast(key)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              >
                <AdminLayout />
              </SnackbarProvider>
            </Suspense>
          }
        >
          <Route index element={<AdminIndex />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="settings" element={<AdminSettings />} />

          {/* Users Routes - Mudasir Nizamani */}
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:user_id" element={<AdminUser />} />

          {/* Faculties Routes - Mudasir Nizamani */}
          <Route path="faculties" element={<AdminFaculties />} />
          <Route path="faculties/:faculty_id" element={<AdminFaculty />} />
          <Route path="faculties/create" element={<AdminCreateFaculty />} />

          {/* Departments Routes - Mudasir Nizamani */}
          <Route path="departments" element={<AdminDepartments />} />
          <Route
            path="departments/:department_id"
            element={<AdminDepartment />}
          />
          <Route path="departments/create" element={<CreateDepartment />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

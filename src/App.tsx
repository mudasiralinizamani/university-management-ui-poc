import "./assets/scss/App.scss";
import { createRef, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import { SnackbarProvider } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

// Importing Layouts - Mudasir Nizamani
import AuthLayout from "./core/layouts/AuthLayout";
import AdminLayout from "./core/layouts/AdminLayout";

// Importing Auth Pages - Mudasir Nizamani
const AuthSignin = lazy(() => import("./features/auth/pages/Signin"));
const AuthAdmin = lazy(() => import("./features/auth/pages/Admin"));

// Imprintg Admin Pages - Mudasir Nizamani
const AdminIndex = lazy(() => import("./features/admin/pages/Index"));

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
        </Route>
      </Routes>
    </div>
  );
}

export default App;

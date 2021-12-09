import React, { useEffect } from "react";
import Topbar from "../../features/admin/blocks/Topbar";
import Sidebar from "../../features/admin/blocks/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function AdminLayout() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (
      (localStorage.getItem("id") !== null &&
        localStorage.getItem("token") !== null &&
        localStorage.getItem("role") !== "ADMIN") ||
      (localStorage.getItem("id") === null &&
        localStorage.getItem("token") === null &&
        localStorage.getItem("role") === null) ||
      (localStorage.getItem("id") === null &&
        localStorage.getItem("role") !== "ADMIN")
    ) {
      enqueueSnackbar("Not Authrozied", { variant: "warning" });
      navigate("/");
    }
  }, []);

  return (
    <div className="out">
      <div className="page5 js-page4">
        <Topbar />
        <div className="page5__wrapper">
          <Sidebar />
          <div className="page5__container">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;

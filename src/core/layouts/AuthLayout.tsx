import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AuthLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("id") !== null &&
      localStorage.getItem("token") != null &&
      localStorage.getItem("role") === "ADMIN"
    ) {
      navigate("/admin");
    }
  }, []);

  return (
    <div className="out">
      <div className="login">
        <div className="login__container">
          <div className="login__wrap">
            <div className="login__head"></div>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;

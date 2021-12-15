import { useSnackbar } from "notistack";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Signout } from "../../../core/services/Signout";

// Importing Material Ui Components - Mudasir Ali
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ApiOutlinedIcon from "@mui/icons-material/ApiOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [facultiesActive, setFacultiesActive] = useState<boolean>(false);
  const [usersActive, setUsersActive] = useState<boolean>(false);
  const [homeActive, setHomeActive] = useState<boolean>(false);
  const [departmentsActive, setDepartmentsActive] = useState<boolean>(false);
  const [subjectsActive, setSubjectsActive] = useState<boolean>(false);

  useEffect(() => {
    const isUsers = location.pathname.includes("/admin/users");
    const isFaculties = location.pathname.includes("/admin/faculties");
    const isDepartments = location.pathname.includes("/admin/departments");
    const isSubjects = location.pathname.includes("/admin/subjects");

    if (isUsers) {
      setUsersActive(true);
    } else if (location.pathname === "/admin") {
      setHomeActive(true);
    } else if (isFaculties) {
      setFacultiesActive(true);
    } else if (isDepartments) {
      setDepartmentsActive(true);
    } else if (isSubjects) {
      setSubjectsActive(true);
    }

    return () => {
      setUsersActive(false);
      setHomeActive(false);
      setFacultiesActive(false);
      setDepartmentsActive(false);
      setSubjectsActive(false);
    };
  }, [location.pathname]);

  const { enqueueSnackbar } = useSnackbar();
  const handleSignout = () => {
    Signout();
    navigate("/");
    enqueueSnackbar("Successfully Signout", { variant: "success" });
  };
  return (
    <div className="sidebar5 js-sidebar4">
      <div className="sidebar5__top">
        <button className="sidebar5__close js-sidebar4-close">
          <svg className="icon icon-close">
            <use xlinkHref="/assets/square/img/sprite.svg#icon-close"></use>
          </svg>
        </button>
        <Link className="sidebar5__logo" to=""></Link>
      </div>
      <div className="sidebar5__wrapper">
        <div className="sidebar5__nav">
          <Link
            className={`sidebar5__item ${homeActive ? "active" : ""}`}
            to="/admin"
          >
            <svg className="icon icon-dashboard">
              <use xlinkHref="/assets/square/img/sprite.svg#icon-dashboard"></use>
            </svg>
            Home
          </Link>
          <Link
            className={`sidebar5__item ${usersActive ? "active" : ""}`}
            to="/admin/users"
          >
            <PeopleAltOutlinedIcon className="icon" />
            Users
          </Link>
          <Link
            className={`sidebar5__item ${facultiesActive ? "active" : ""}`}
            to="/admin/faculties"
          >
            <AccountTreeOutlinedIcon className="icon" />
            Faculties
          </Link>
          <Link
            className={`sidebar5__item ${departmentsActive ? "active" : ""}`}
            to="/admin/departments"
          >
            <ApiOutlinedIcon className="icon" />
            Departments
          </Link>
          <Link
            className={`sidebar5__item ${subjectsActive ? "active" : ""}`}
            to="/admin/subjects"
          >
            <AppsOutlinedIcon className="icon" />
            Subjects
          </Link>
        </div>
      </div>

      <Link to="/" className="sidebar5__logout" onClick={handleSignout}>
        <svg className="icon icon-logout">
          <use xlinkHref="/assets/square/img/sprite.svg#icon-logout"></use>
        </svg>
        Signout
      </Link>
    </div>
  );
}

export default Sidebar;

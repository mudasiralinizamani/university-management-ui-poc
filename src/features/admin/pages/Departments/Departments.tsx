import axios from "../../../../core/api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DepartmentEndpoints } from "../../../../core/api/endpoints";
import { IDepartment } from "../../../../core/models/IDepartment.interface";

// Material Ui Components - Mudasir Nizamani
import MaterialTable from "material-table";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Departments() {
  const [departments, setDepartments] = useState<IDepartment[]>();
  const [columns] = useState([
    { title: "Name", field: "name" },
    { title: "Head Of Department", field: "headOfDepartmentName" },
    { title: "Course Adviser", field: "courseAdviserName" },
    { title: "Faculty", field: "facultyName" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      await axios
        .get(DepartmentEndpoints.GetDepartments)
        .then((res) => setDepartments(res?.data))
        .catch((err) => setDepartments([]));
    };

    getDepartments();
    return () => {
      setDepartments([]);
    };
  }, []);

  let data: any = departments;

  return (
    <>
      <div className="sorting1">
        <div className="sorting1__row">
          <h1 className="sorting1__title title">
            <Button
              variant="text"
              onClick={() => navigate("/admin/departments/create")}
            >
              Create Department
            </Button>
          </h1>
        </div>
      </div>
      <MaterialTable
        title="Departments"
        data={data}
        columns={columns}
        options={{ filtering: true, exportButton: true }}
        actions={[
          {
            icon: "view",
            tooltip: "View Department",
            onClick: (event, rowData: any) =>
              navigate(`/admin/departments/${rowData.facultyId}`),
          },
        ]}
        components={{
          Action: (props: any) => (
            <IconButton
              aria-label="view"
              onClick={(event) => props.action.onClick(event, props.data)}
            >
              <VisibilityIcon />
            </IconButton>
          ),
        }}
      />
    </>
  );
}

export default Departments;

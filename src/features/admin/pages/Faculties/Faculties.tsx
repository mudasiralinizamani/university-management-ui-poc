import axios from "../../../../core/api/axios";
import { useEffect, useState } from "react";

import { FacultiesEndpoints } from "../../../../core/api/endpoints";
import { useNavigate } from "react-router-dom";

// Material Ui Components - Mudasir Nizamani
import MaterialTable from "material-table";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IFaculty } from "../../../../core/models/IFaculty.interface";

function Faculties() {
  const [faculties, setFaculties] = useState<IFaculty | null>();

  const [columns] = useState([
    { title: "Name", field: "name" },
    { title: "Dean", field: "deanName" },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const getFaculties = async () => {
      await axios.get(FacultiesEndpoints.GetFaculties).then((res) => {
        setFaculties(res?.data.faculties);
      });
    };
    getFaculties();
    return () => {
      setFaculties(null);
    };
  }, []);

  let data: any = faculties;

  return (
    <>
      <div className="sorting1">
        <div className="sorting1__row">
          <h1 className="sorting1__title title">
            <Button
              variant="text"
              onClick={() => navigate("/admin/faculties/create")}
            >
              Create Faculty
            </Button>
          </h1>
        </div>
      </div>
      <MaterialTable
        title="Faculties"
        data={data}
        columns={columns}
        options={{ filtering: true, exportButton: true }}
        actions={[
          {
            icon: "view",
            tooltip: "View Faculty",
            onClick: (event, rowData: any) =>
              navigate(`/admin/faculties/${rowData.facultyId}`),
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

export default Faculties;

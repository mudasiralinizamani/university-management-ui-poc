import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { SyntheticEvent, useEffect, useState } from "react";
import { IUser } from "../../../../core/models/IUser.interface";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import axios from "../../../../core/api/axios";
import { IFaculty } from "../../../../core/models/IFaculty.interface";
import {
  FacultiesEndpoints,
  UserEndpoints,
} from "../../../../core/api/endpoints";

function CreateDepartment() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [hods, setHods] = useState<IUser[]>([]);
  const [courseAdvisers, setCourseAdvisers] = useState<IUser[]>([]);
  const [faculties, setFaculties] = useState<IFaculty[]>([]);

  // FormData - Mudasir Nizamani
  const [name, setName] = useState<string>("");
  const [hodId, setHodId] = useState<string>("");
  const [courseAdviserId, setCourseAdviserId] = useState<string>("");
  const [facultyId, setFacultyId] = useState<string>("");

  useEffect(() => {
    const getHods = async () => {
      await axios.get(UserEndpoints.GetHods).then((res) => setHods(res.data));
    };

    const getCourseAdvisers = async () => {
      await axios
        .get(UserEndpoints.GetCourseAdvisers)
        .then((res) => setCourseAdvisers(res.data));
    };

    const getFaculties = async () => {
      await axios
        .get(FacultiesEndpoints.GetFaculties)
        .then((res) => setFaculties(res?.data.faculties));
    };

    getHods();
    getCourseAdvisers();
    getFaculties();

    return () => {
      setHods([]);
      setCourseAdvisers([]);
      setFaculties([]);
    };
  }, []);

  // These DefaultProps objects will be used for AutoComplete fields to Display FieldLabel - Mudasir Nizamani
  const hodDefaultProps = {
    options: hods,
    getOptionLabel: (option: IUser) => `${option.firstName} ${option.lastName}`,
  };

  const courseAdviserDefaultProps = {
    options: courseAdvisers,
    getOptionLabel: (option: IUser) => `${option.firstName} ${option.lastName}`,
  };

  const facultiesDefaultProps = {
    options: faculties,
    getOptionLabel: (option: IFaculty) => option.name,
  };

  const Submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (hodId === "" || hodId === null || hodId === undefined) {
      enqueueSnackbar("Plz select a Head Of Department", { variant: "error" });
      return;
    } else if (name === "" || name === null || name === undefined) {
      enqueueSnackbar("Name cannot be empty", { variant: "error" });
      return;
    } else if (
      courseAdviserId === "" ||
      courseAdviserId === null ||
      courseAdviserId === undefined
    ) {
      enqueueSnackbar("Plz select a Course Adviser", { variant: "error" });
      return;
    } else if (
      facultyId === "" ||
      facultyId === null ||
      facultyId === undefined
    ) {
      enqueueSnackbar("Plz select a Faculty", { variant: "error" });
      return;
    }
  };

  return (
    <>
      <div className="page__wrapper">
        <div className="entry">
          <div className="entry__wrap">
            <div className="entry__title">Create Faculty</div>
            <form
              className="entry__form"
              onSubmit={(event) => {
                Submit(event);
              }}
            >
              <div className="entry__group">
                <TextField
                  id="outlined-basic"
                  label="Name *"
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  variant="standard"
                />
                <Autocomplete
                  {...hodDefaultProps}
                  sx={{ marginTop: "18px" }}
                  id="clear-on-escape"
                  clearOnEscape
                  freeSolo
                  onChange={(event, value: any) => setHodId(value?.userId)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Head Of Department *"
                      variant="standard"
                    />
                  )}
                />
                <Autocomplete
                  {...courseAdviserDefaultProps}
                  sx={{ marginTop: "18px" }}
                  id="clear-on-escape"
                  clearOnEscape
                  freeSolo
                  onChange={(event, value: any) =>
                    setCourseAdviserId(value?.userId)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Course Adviser *"
                      variant="standard"
                    />
                  )}
                />
                <Autocomplete
                  {...facultiesDefaultProps}
                  sx={{ marginTop: "18px" }}
                  id="clear-on-escape"
                  clearOnEscape
                  freeSolo
                  onChange={(event, value: any) =>
                    setFacultyId(value?.facultyId)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Faculty *"
                      variant="standard"
                    />
                  )}
                />
              </div>
              <button
                className="entry__btn btn btn btn_big btn_wide btn_blue"
                type="submit"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateDepartment;

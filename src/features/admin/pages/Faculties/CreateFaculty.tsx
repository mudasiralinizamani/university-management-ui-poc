import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { SyntheticEvent, useEffect, useState } from "react";
import { IUser } from "../../../../core/models/IUser.interface";
import axios from "../../../../core/api/axios";
import {
  FacultiesEndpoints,
  UserEndpoints,
} from "../../../../core/api/endpoints";
import { useSnackbar } from "notistack";
import { ICreateFaculty } from "../../models/ICreateFaculty.interface";
import { useNavigate } from "react-router";

function CreateFaculty() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [deans, setDeans] = useState<IUser[]>([]);
  const [deanId, setDeanId] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const getDeans = async () => {
      await axios.get(UserEndpoints.GetDeans).then((res) => {
        setDeans(res.data);
      });
    };
    getDeans();
    return () => {
      setDeans([]);
    };
  }, []);

  const defaultProps = {
    options: deans,
    getOptionLabel: (option: IUser) => `${option.firstName} ${option.lastName}`,
  };

  const Submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (deanId === "" || deanId === null || deanId === undefined) {
      enqueueSnackbar("Plz select a dean", { variant: "error" });
      return;
    } else if (name === "" || name === null || name === undefined) {
      enqueueSnackbar("Name cannot be empty", { variant: "error" });
      return;
    }
    let model: ICreateFaculty = {
      deanId: deanId,
      name: name,
    };
    await axios
      .post(FacultiesEndpoints.CreateFaculty, model)
      .then((res) => {
        if (res.data.succeeded === true) {
          enqueueSnackbar("Faculty Successfully Created", {
            variant: "success",
          });
          navigate("/admin/faculties", { replace: true });
        }
      })
      .catch((err: any) => {
        console.log(err.response?.data);
        if (err.response?.data.code === "ValidationError") {
          enqueueSnackbar("Server returned validation error, Try later", {
            variant: "warning",
          });
          return;
        } else if (err.response?.data.code === "DeanExist") {
          enqueueSnackbar(
            "This Dean already have another facutly, Plz Choose another dean",
            { variant: "warning" }
          );
          return;
        } else if (err.response?.data.code === "FacultyExist") {
          enqueueSnackbar("This Faculty already exists", {
            variant: "warning",
          });
          return;
        } else if (err.response?.status === 500) {
          enqueueSnackbar("Server returned ServerError, Plz try later", {
            variant: "error",
          });
          return;
        }
      });
  };
  return (
    <div>
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
                <Autocomplete
                  {...defaultProps}
                  id="clear-on-escape"
                  clearOnEscape
                  freeSolo
                  onChange={(event, value: any) => setDeanId(value?.userId)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Dean *"
                      variant="standard"
                    />
                  )}
                />
                <TextField
                  sx={{ marginTop: "14px" }}
                  id="outlined-basic"
                  label="Name *"
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  variant="standard"
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
    </div>
  );
}

export default CreateFaculty;

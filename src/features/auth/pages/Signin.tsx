import * as yup from "yup";
import { AuthEndpoints } from "../../../core/api/endpoints";
import { yupResolver } from "@hookform/resolvers/yup";
import { ISignin } from "../models/ISignin.interface";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import axios from "../../../core/api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { IUser } from "../../../core/models/IUser.interface";

// Importing Material Ui Components - Mudasir Ali
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address"),
  password: yup.string().required("Password is required"),
});

function Signin() {
  const [isLoading, setLoading] = useState<boolean>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISignin>({
    resolver: yupResolver(validationSchema),
  });

  const Submit: SubmitHandler<ISignin> = async (formData: ISignin) => {
    setLoading(true);
    const model: ISignin = {
      email: formData.email,
      password: formData.password,
    };
    await axios
      .post<IUser>(AuthEndpoints.Signin, model)
      .then((res) => {
        if (res.data.role === "ADMIN") {
          setLoading(false);
          localStorage.setItem("role", res.data.role);
          localStorage.setItem("id", res.data.userId);
          localStorage.setItem("token", res.data.token);
          navigate("/admin");
          enqueueSnackbar(`Welcome in Admin Dashboard`, { variant: "success" });
        } else {
          enqueueSnackbar("Can't find your Role, Try signin again", {
            variant: "error",
          });
        }
      })
      .catch((err: any) => {
        if (
          err.response?.status === 400 &&
          err.response?.data.code === "ValidationError"
        ) {
          setLoading(false);
          enqueueSnackbar("Validation Error, plz check console");
          console.log(err.response?.data.error);
        } else if (
          err.response?.status === 400 &&
          err.response?.data.code === "EmailNotFound"
        ) {
          setLoading(false);
          enqueueSnackbar("Email address does not exist", { variant: "error" });
        } else if (
          err.response?.status === 400 &&
          err.response?.data.code === "IncorrectPassword"
        ) {
          setLoading(false);
          enqueueSnackbar("Password is Incorrect", { variant: "error" });
        } else {
          setLoading(false);
          enqueueSnackbar("Something went wrong in Server, Plz try later", {
            variant: "error",
          });
        }
      });
  };
  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(Submit)}
      autoComplete="off"
      className="login__form boxScale"
    >
      <div className="login__body">
        <div className="login__title login__title_sm">
          <h2>SignIn</h2>
        </div>

        <div className="form_box">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                size="small"
                fullWidth={true}
                {...field}
                label="Email"
                error={!!errors.email}
                helperText={errors.email ? errors.email?.message : ""}
                sx={{
                  marginBottom: "1rem",
                }}
                variant="outlined"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                size="small"
                fullWidth={true}
                {...field}
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password ? errors.password?.message : ""}
                sx={{
                  marginBottom: "1rem",
                }}
                variant="outlined"
              />
            )}
          />
        </div>

        <LoadingButton
          sx={{
            borderRadius: "5px",
          }}
          variant="contained"
          type="submit"
          loading={isLoading}
          startIcon={<LoginRoundedIcon />}
        >
          Signin
        </LoadingButton>

        <ul className="login__links">
          <li>
            <Link to="/auth/signup/" className="login__link">
              Sign Up?
            </Link>
          </li>
        </ul>
      </div>
    </Box>
  );
}

export default Signin;

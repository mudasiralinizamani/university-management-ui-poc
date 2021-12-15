import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthEndpoints } from "../../../core/api/endpoints";
import { ISignup } from "../models/ISignup.interface";
import { IAuth } from "../models/IAuth.interface";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import axios from "../../../core/api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useSnackbar } from "notistack";

// Importing Material Ui Components - Mudasir Ali
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

// Validation Schema for Form - Mudasir Ali
const validationSchema = yup.object().shape({
  firstName: yup.string().required("FirstName is required").min(4).max(15),
  lastName: yup.string().required("LastName is required").min(2).max(15),
  email: yup.string().required("Email is required").email(),
  password: yup.string().required("Password is required").min(6).max(30),
  confirmPassword: yup
    .string()
    .required("ConfirmPassword is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

function Hod() {
  const [isLoading, setLoading] = useState<boolean>();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IAuth>({
    resolver: yupResolver(validationSchema),
  });

  const Submit: SubmitHandler<IAuth> = async (formData: IAuth) => {
    const model: ISignup = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      profilePic: "/assets/images/users-default-profile-pic.jpg",
      password: formData.confirmPassword,
      role: "HOD",
    };
    await axios
      .post(AuthEndpoints.Signup, model)
      .then((res) => {
        if (res.status === 200 && res.data?.succeeded === true) {
          setLoading(false);
          navigate("/");
          enqueueSnackbar("Your account has been successfully created", {
            variant: "success",
          });
        }
      })
      .catch((err: any) => {
        if (
          err.response?.status === 400 &&
          err.response.data?.code === "ValidationError"
        ) {
          setLoading(false);
          enqueueSnackbar("Server returned Validatin Error, Try Again", {
            variant: "error",
          });
        } else if (
          err.response?.status === 400 &&
          err.response.data?.code === "EmailAlreadyExist"
        ) {
          setLoading(false);
          enqueueSnackbar("Email address already exists", { variant: "error" });
        } else {
          setLoading(false);
          enqueueSnackbar("Something went wront in server, Plz try later", {
            variant: "error",
          });
          console.log(err);
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
          <h2>HeadOfDepartment Signup</h2>
        </div>

        <div className="form_box">
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                size="small"
                fullWidth={true}
                {...field}
                label="FirstName"
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName?.message : ""}
                sx={{
                  marginBottom: "1rem",
                }}
                variant="outlined"
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                size="small"
                fullWidth={true}
                {...field}
                label="LastName"
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName?.message : ""}
                sx={{
                  marginBottom: "1rem",
                }}
                variant="outlined"
              />
            )}
          />

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

          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                size="small"
                fullWidth={true}
                {...field}
                label="ConfirmPassword"
                type="password"
                error={!!errors.confirmPassword}
                helperText={
                  errors.confirmPassword ? errors.confirmPassword?.message : ""
                }
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
          loading={isLoading}
          variant="contained"
          type="submit"
          startIcon={<PersonAddRoundedIcon />}
        >
          Signup
        </LoadingButton>

        <ul className="login__links">
          <li>
            <Link to="/" className="login__link">
              Sign In?
            </Link>
          </li>
        </ul>
      </div>
    </Box>
  );
}

export default Hod;

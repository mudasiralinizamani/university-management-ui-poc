const AuthEndpoints = {
  Signin: "/auth/signin",
  Signup: "/auth/signup",
};

const UserEndpoints = {
  GetUser: "/user/getuser/",
  GetUsers: "/user/getusers",
  GetUsersCount: "/user/getuserscount",
  GetUserById: "/user/GetUserById/",
  GetDeans: "/user/GetDeans/",
};

const FacultyEndpoints = {
  GetFaculties: "/faculty/GetFaculties",
};

const DepartmentEndpoints = {
  GetDepartments: "/department/GetDepartments",
};

export { AuthEndpoints, UserEndpoints, FacultyEndpoints, DepartmentEndpoints };

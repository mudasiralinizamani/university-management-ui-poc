const AuthEndpoints = {
  Signin: "/auth/signin",
  Signup: "/auth/signup",
};

const UserEndpoints = {
  GetUser: "/users/getuser/",
  GetUsers: "/users/getusers",
  GetUsersCount: "/users/getuserscount",
  GetDeans: "/users/getusersbyrole/DEAN",
};

const FacultiesEndpoints = {
  GetFaculties: "/faculties/getfaculties",
  GetFaculty: "/faculties/getfaculty/",
  CreateFaculty: "/faculties/create",
};

const DepartmentEndpoints = {
  GetDepartments: "/department/GetDepartments",
};

export {
  AuthEndpoints,
  UserEndpoints,
  FacultiesEndpoints,
  DepartmentEndpoints,
};

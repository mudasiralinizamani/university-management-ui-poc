const AuthEndpoints = {
  Signin: "/auth/signin",
  Signup: "/auth/signup",
};

const UserEndpoints = {
  GetUser: "/users/getuser/",
  GetUsers: "/users/getusers",
  GetUsersCount: "/users/getuserscount",
  GetDeans: "/users/getusersbyrole/DEAN",
  GetHods: "/users/getusersbyrole/HOD",
  GetCourseAdvisers: "/users/getusersbyrole/COURSEADVISER",
};

const FacultiesEndpoints = {
  GetFaculties: "/faculties/getfaculties",
  GetFaculty: "/faculties/getfaculty/",
  CreateFaculty: "/faculties/create",
};

const DepartmentEndpoints = {
  GetDepartments: "/departments/getdepartments",
  GetFacultyDepartments: "/departments/getfacultydepartments/"
};

export {
  AuthEndpoints,
  UserEndpoints,
  FacultiesEndpoints,
  DepartmentEndpoints,
};

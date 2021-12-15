import axios from "../../../../core/api/axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IFaculty } from "../../../../core/models/IFaculty.interface";
import {
  FacultiesEndpoints,
  DepartmentEndpoints,
} from "../../../../core/api/endpoints";
import "../../../../assets/scss/admin/Faculties/Faculty.scss";
import { IDepartment } from "../../../../core/models/IDepartment.interface";
import EditFaculty from "../../components/EditFaculty";

function Faculty() {
  const { faculty_id } = useParams();
  const [faculty, setFaculty] = useState<IFaculty | null>();
  const [departments, setDepartments] = useState<IDepartment[]>([]);

  useEffect(() => {
    const getFaculty = async () => {
      await axios
        .get(FacultiesEndpoints.GetFaculty + faculty_id)
        .then((res) => {
          setFaculty(res.data);
        })
        .catch((err: any) => {});
    };

    const getFacultyDepartments = async () => {
      await axios
        .get(DepartmentEndpoints.GetFacultyDepartments + faculty_id)
        .then((res) => setDepartments(res.data))
        .catch((err) => setDepartments([]));
    };

    getFaculty();
    getFacultyDepartments();

    return () => {
      setFaculty(null);
      setDepartments([]);
    };
  }, []);

  return (
    <>
      <div className="page2__container">
        <div className="page2__row">
          {/* Col w35 START - Mudasir Nizamani */}
          <div className="page2__col page2__col_w35">
            <div className="card1">
              <div className="card1__head">
                <div className="card1__category">Faculty Details</div>
              </div>
              <div className="card1__body">
                <div className="card1__list faculty_details_card">
                  <p>Name: </p>
                  <Link
                    className="card1__item"
                    to={`/admin/faculties/${faculty_id}`}
                  >
                    {faculty?.name}
                  </Link>
                </div>
                <div className="card1__list faculty_details_card">
                  <p>Dean: </p>
                  <Link
                    className="card1__item"
                    to={`/admin/users/${faculty?.deanId}`}
                  >
                    {faculty?.deanName}
                  </Link>
                </div>
                <div className="card1__list faculty_details_card">
                  <p>Created: </p>
                  <Link className="card1__item" to="">
                    {faculty?.createdAt.slice(0, 10)}
                  </Link>
                </div>
                <div className="card1__list faculty_details_card">
                  <p>Updated: </p>
                  <Link className="card1__item" to="">
                    {faculty?.updatedAt.slice(0, 10)}
                  </Link>
                </div>
              </div>
            </div>
            <div className="card1 margin-top-1">
              <div className="card1__head">
                <div className="card1__category">Faculty Departments</div>
              </div>
              <div className="card1__body">
                {departments?.map((department) => {
                  return (
                    <div className="card1__list faculty_details_card">
                      <Link
                        className="card1__item"
                        to={`/admin/departments/${faculty_id}`}
                      >
                        {department?.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Col w_35 END */}
          <div className="page2__col page2__col_w65">
            <div className="post__item">
              <EditFaculty facultyDetails={faculty} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Faculty;

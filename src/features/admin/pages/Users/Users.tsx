import axios from "../../../../core/api/axios";
import { useEffect, useState } from "react";
import { UserEndpoints } from "../../../../core/api/endpoints";
import UserCard from "../../components/UserCard/UserCard";

function Users() {
  const [users, setUsers] = useState<any>();

  useEffect(() => {
    const fetchUsers = async () => {
      await axios
        .get(UserEndpoints.GetUsers)
        .then((res) => {
          setUsers(res.data?.user_items);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    };

    fetchUsers();

    return () => {
      setUsers(null);
    };
  }, []);

  return (
    <div className="student">
      <div className="student__head">
        <div className="student__text">
          These are total users in the Database
        </div>
      </div>
      <div className="student__control">
        <div className="student__search">
          <button className="student__open">
            <svg className="icon icon-search">
              <use xlinkHref="/assets/templates/square/img/sprite.svg#icon-search"></use>
            </svg>
          </button>
          <input
            className="student__input"
            type="text"
            placeholder="Search Student"
          />
        </div>
      </div>
      <div className="student__list student__list_2">
        {users?.map((user: any) => {
          return (
            <UserCard
              id={user.userid}
              firstName={user.firstname}
              lastName={user.lastname}
              profilePic={user.profilepic}
              key={user.userid}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Users;

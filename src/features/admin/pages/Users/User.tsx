import { useParams } from "react-router-dom";

function User() {
  const { user_id } = useParams();
  return <div>User id: {user_id}</div>;
}

export default User;

import { useNavigate } from "react-router-dom";
import "./UserCard.scss";
import Button from "@mui/material/Button";
import RemoveRedEyeRoundedIcon from "@mui/icons-material/RemoveRedEyeRounded";

interface props {
  firstName: string;
  lastName: string;
  profilePic: string;
  id: string;
}

function UserCard(props: props) {
  const navigate = useNavigate();
  return (
    <div className="student__item">
      <div className="student__ava">
        <img
          className="student__pic"
          src={props.profilePic}
          alt={props.firstName}
        />
      </div>
      <div className="student__title title title_sm">
        {props.firstName} {props.lastName}
      </div>
      <Button
        size="small"
        onClick={() =>
          navigate(`/admin/users/${props.id}`, { replace: true })
        }
        className="view_button"
        variant="contained"
        startIcon={<RemoveRedEyeRoundedIcon />}
      >
        View Profile
      </Button>
    </div>
  );
}

export default UserCard;

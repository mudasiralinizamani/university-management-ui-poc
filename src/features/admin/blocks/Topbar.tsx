import { useState } from "react";

import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";

function Topbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };
  return (
    <div className="header5 js-header4">
      <button className="header5__burger js-header4-burger">
        <svg className="icon icon-burger">
          <use xlinkHref="/assets/square/img/sprite.svg#icon-burger"></use>
        </svg>
      </button>
      <Link className="header5__logo" to="">
        <img
          className="header5__pic header5__pic_black"
          src="/assets/square/img/logo.svg"
          alt=""
        />
        <img
          className="header5__pic header5__pic_white"
          src="/assets/square/img/logo-white.svg"
          alt=""
        />
      </Link>
      <button className="header5__notifications">
        <svg className="icon icon-bell">
          {/* <use xlinkHref="/assets/templates/square/img/sprite.svg#icon-bell"></use> */}
        </svg>
      </button>
      <Avatar
        alt="Remy Sharp"
        src="/assets/images/users-default-profile-pic.jpg"
        onClick={openMenu}
        sx={{ width: 24, height: 24 }}
      />
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>Profile</MenuItem>
        <MenuItem onClick={closeMenu}>My account</MenuItem>
      </Menu>

      <div className="header5__bg js-header4-bg"></div>
    </div>
  );
}

export default Topbar;

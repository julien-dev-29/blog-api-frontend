import { NavLink, useNavigate } from "react-router";
import { isAuth, logOut } from "../../authentication/auth";
import { LogOutIcon } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut();
    navigate("/");
  };
  return (
    <div className="navbar gap-4 bg-teal-800 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Blog</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <NavLink className="link-info" to="posts">
            Posts
          </NavLink>
        </ul>
      </div>
      {isAuth() && (
        <div className="flex gap-4 items-center justify-center">
          <div className="avatar avatar-online">
            <div className="w-8 rounded-full">
              <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
            </div>
          </div>
          <button className="btn btn-error w-12" onClick={handleLogout}>
            <LogOutIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;

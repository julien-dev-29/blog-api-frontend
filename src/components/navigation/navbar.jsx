import { NavLink } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar bg-teal-800 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <NavLink to="posts">Posts</NavLink>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <h1>Auth Layout</h1>
      <Outlet />
    </div>
  );
};
export default AuthLayout;

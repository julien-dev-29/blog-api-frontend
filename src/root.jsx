import { Outlet } from "react-router";
import Navbar from "./components/navigation/navbar";
import Footer from "./components/navigation/footer";

const Root = () => {
  return (
    <div className="flex-layout">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Root;

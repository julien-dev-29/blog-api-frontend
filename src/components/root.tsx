import { Outlet } from "react-router";
import Header from "./organism/header";
import Footer from "./organism/footer";

export default function Root() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-between">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

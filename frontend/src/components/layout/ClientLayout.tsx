import { Outlet } from "react-router-dom";
import Header from "./Header";

const ClientLayout = () => {
  return (
    <>
      <Header />

      <main style={{ minHeight: "100vh", background: "#fff" }}>
        <Outlet />
      </main>
    </>
  );
};

export default ClientLayout;

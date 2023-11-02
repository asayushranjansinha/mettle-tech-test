import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="w-full h-screen bg-blue-50">
      <main className="container mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

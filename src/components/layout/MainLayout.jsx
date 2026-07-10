import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function MainLayout() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-area">
        <header className="topbar">
          <div className="top-left">
          </div>
        </header>

        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
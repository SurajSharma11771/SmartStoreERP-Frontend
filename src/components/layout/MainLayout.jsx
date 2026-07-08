import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function MainLayout() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-area">
        <header className="topbar">
          <div className="top-left">
            <div className="menu-btn">≡</div>
            <div>
              <span className="topbar-title">Dashboard</span>
              <span className="topbar-subtitle">Overview of your business</span>
            </div>
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
import { useState } from "react";
import { Drawer } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import MobileTopbar from "./MobileTopbar";
import MobileBottomNav from "./MobileBottomNav";

function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <div className="desktop-sidebar-container">
        <Sidebar />
      </div>

      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={closeMobileMenu}
        className="mobile-sidebar-drawer"
        PaperProps={{
          sx: {
            width: 280,
            maxWidth: "86vw",
          },
        }}
      >
        <Sidebar onNavigate={closeMobileMenu} />
      </Drawer>

      <div className="main-area">
        <MobileTopbar onMenuClick={openMobileMenu} />

      
        <main className="page-container">
          <Outlet />
        </main>

        <MobileBottomNav onMoreClick={openMobileMenu} />
      </div>
    </div>
  );
}

export default MainLayout;
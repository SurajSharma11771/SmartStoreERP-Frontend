import {
  MenuRounded,
  NotificationsNoneRounded,
  SearchRounded,
} from "@mui/icons-material";

function MobileTopbar({ onMenuClick }) {
  return (
    <header className="mobile-app-header">
      <button
        type="button"
        className="mobile-header-button"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <MenuRounded />
      </button>

      <div className="mobile-app-brand">
        <div className="mobile-app-brand-name">
          Smart<span>Store</span>
        </div>

        <div className="mobile-app-brand-subtitle">ERP</div>
      </div>
    </header>
  );
}

export default MobileTopbar;
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { useState } from "react";

import styles from "./Header.module.css";

export default function Header() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());

    toast.success("Logged out");

    navigate("/", { replace: true });
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>📚 ReadJourney</div>

      <nav
        className={`${styles.nav} ${
          menuOpen ? styles.navOpen : ""
        }`}
      >
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? styles.active : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/mylibrary"
          className={({ isActive }) =>
            isActive ? styles.active : ""
          }
        >
          My Library
        </NavLink>
      </nav>

      <div className={styles.user}>
        <span>{user?.name}</span>

        <button onClick={handleLogout}>Logout</button>
      </div>

      <button
        className={styles.burger}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
    </header>
  );
}
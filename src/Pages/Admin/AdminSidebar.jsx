import { NavLink } from "react-router-dom";
import './Admin.css';
const items = [
  { to: "/admin/home", label: "Inicio / Home", icon: "🏠" },
  { to: "/admin/scores", label: "Scores", icon: "🎼" },
  { to: "/admin/instruments", label: "Instruments", icon: "🎺" },
  { to: "/admin/composers", label: "Composers", icon: "🎻" },
];

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <nav className="admin-menu">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              "admin-menu__item" + (isActive ? " is-active" : "")
            }
          >
            <span className="admin-menu__icon">{it.icon}</span>
            <span className="admin-menu__label">{it.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
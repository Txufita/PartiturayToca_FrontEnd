import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import './Admin.css';
export default function AdminLayout({ children }) {
  return (
    <div className="admin-shell">
      <AdminHeader />
      <div className="admin-body">
        <AdminSidebar />
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
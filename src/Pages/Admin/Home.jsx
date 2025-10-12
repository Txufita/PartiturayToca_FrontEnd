import AdminLayout from "./AdminLayout";
import './Admin.css';
export default function AdminHome() {
  return (
    <AdminLayout>
      <section className="admin-home">
        <h1 className="admin-title">Panel de administración</h1>
        <p className="admin-subtitle">Bienvenido. Elige una sección del menú lateral.</p>

        <div className="admin-grid">
          <a href="/admin/scores" className="admin-card">
            <h3>Partituras</h3>
            <p>Gestiona partituras: crear, editar, eliminar, buscar.</p>
          </a>

          <a href="/admin/instruments" className="admin-card">
            <h3>Instrumentos</h3>
            <p>Gestión de instrumentos disponibles para las partituras.</p>
          </a>

          <a href="/admin/composers" className="admin-card">
            <h3>Compositores</h3>
            <p>Alta y edición de compositores asociados.</p>
          </a>
        </div>
      </section>
    </AdminLayout>
  );
}
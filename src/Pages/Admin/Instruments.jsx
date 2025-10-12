import { useEffect, useMemo, useState } from "react";
import AdminLayout from './AdminLayout'
import { getInstruments, postInstrument, updateInstruments, deleteInstrument } from "../../API/instruments";

export default function InstrumentsAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");
  const [form, setForm] = useState({ name: "" });
  const [editingId, setEditingId] = useState(null);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const { data } = await getInstruments();
      setItems(Array.isArray(data) ? data : data?.instruments || []);
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "Error cargando instrumentos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name?.trim()) {
      setError("El nombre es obligatorio");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (editingId) {
        await updateInstruments(editingId, form);
      } else {
        // CREATE
        await postInstrument(form);
      }
      setForm({ name: "" });
      setEditingId(null);
      await load();
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "No se pudo guardar");
    } finally {
      setSaving(false);
    }
  }

  function onEdit(it) {
    setEditingId(it.id);
    setForm({ name: it.name ?? "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function onDelete(id) {
    if (!confirm("¿Eliminar este instrumento?")) return;
    try {
      await deleteInstrument(id);
      setItems(prev => prev.filter(x => x.id !== id));
    } catch (e) {
      setError(e?.response?.data?.message || e?.message || "No se pudo eliminar");
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ name: "" });
  }

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return items;
    return items.filter(it =>
      String(it.name || "").toLowerCase().includes(q) ||
      String(it.id || "").toLowerCase().includes(q)
    );
  }, [items, filter]);

  return (
    <AdminLayout>
      <section className="admin-home">
        <h1 className="admin-title">Instruments</h1>
        <p className="admin-subtitle">Crea, edita y elimina instrumentos. El menú lateral permanece visible.</p>

        {/* FORM CARD */}
        <div className="admin-grid" style={{ marginBottom: 12 }}>
          <div className="admin-card" style={{ maxWidth: 520 }}>
            <h3 style={{ marginBottom: 10 }}>{editingId ? "Editar instrumento" : "Nuevo instrumento"}</h3>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-field">
                <label>Nombre</label>
                <input
                  className="input"
                  type="text"
                  placeholder="p. ej. Violín"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                />
              </div>

              {error && <p className="auth-msg error" style={{ marginTop: 6 }}>{error}</p>}

              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button className="btn" type="submit" disabled={saving}>
                  {saving ? "Guardando..." : (editingId ? "Guardar cambios" : "Crear")}
                </button>
                {editingId && (
                  <button className="btn btn-ghost" type="button" onClick={cancelEdit}>
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* SEARCH CARD */}
          <div className="admin-card">
            <h3 style={{ marginBottom: 10 }}>Buscar</h3>
            <input
              className="input"
              type="text"
              placeholder="Filtrar por nombre o ID…"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
          </div>
        </div>

        {/* LIST CARD */}
        <div className="admin-card">
          <h3 style={{ marginBottom: 10 }}>Listado</h3>

          {loading ? (
            <p className="admin-subtitle">Cargando instrumentos…</p>
          ) : filtered.length === 0 ? (
            <p className="admin-subtitle">No hay instrumentos.</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ width: 100 }}>ID</th>
                    <th>Nombre</th>
                    <th style={{ width: 160 }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(it => (
                    <tr key={it.id}>
                      <td>{it.id}</td>
                      <td>{it.name}</td>
                      <td>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button className="btn" onClick={() => onEdit(it)}>Editar</button>
                          <button className="btn btn-ghost" onClick={() => onDelete(it.id)}>Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </AdminLayout>
  );
}
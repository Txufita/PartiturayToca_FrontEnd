import { useEffect, useMemo, useState } from "react";
import { getScore, getScores, postScore, updateScore, deleteScore } from "../../API/scores";
import { getComposers } from "../../API/composers";
import { getInstruments } from "../../API/instruments";
import { upLoad } from "../../API/upload";
import AdminLayout from "./AdminLayout";

import "./Scores.css";

export default function ScoresAdmin() {
    const empty = {
        title: "",
        composer_id: "",
        instrument_id: "",
        file_path: "",
        file_type: "pdf",
    };
    
    const BASE = import.meta.env.VITE_API_IMAGES_URL || "http://localhost:4000";

    const [items, setItems] = useState([]);
    const [form, setForm] = useState(empty);
    const [editingId, setEditingId] = useState(null);

    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    
    const [composers, setComposers] = useState([]);
    const [instruments, setInstruments] = useState([]);

    
    const [isOpen, setIsOpen] = useState(false);
    const [confirm, setConfirm] = useState({ open: false, id: null, title: "" });
    const [saving, setSaving] = useState(false);

    const [uploading, setUploading] = useState(false);


    async function load() {
        setLoading(true);
        try {
            const { data } = await getScores();
            setItems(data);
        } catch (error) {
            console.error("error cargando partituras ", error);
            alert("Error cargando partituras");
        } finally {
            setLoading(false);
        }
    }

    async function loadCatalogs() {
        try {
            const [composersRes, instrumentsRes] = await Promise.all([
                getComposers(),
                getInstruments(),
            ]);
            console.log(composersRes, instrumentsRes);
            setComposers(composersRes.data || []);
            setInstruments(instrumentsRes.data || []);
        } catch (error) {
            console.error("Error cargando catálogos", error);
            alert("No se pudieron cargar los catálogos de compositores e instrumentos");
        }
    }


    useEffect(() => {
        load();
        loadCatalogs();
    }, []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return items;
        return items.filter((s) =>
            [s.title, s.composer_name, s.instrument_name, s.file_type]
                .filter(Boolean)
                .some((v) => v.toLowerCase().includes(q))
        );
    }, [items, query]);

    
    function openCreate() {
        setEditingId(null);
        setForm(empty);
        setIsOpen(true);
    }

    
    async function openEdit(id) {
        try {
            setEditingId(id);
            const { data } = await getScore(id);
            setForm({
                title: data.title || "",
                composer_id: data.composer_id ?? "",
                instrument_id: data.instrument_id ?? "",
                file_path: data.file_path || "",
                file_type: data.file_type || "pdf",
            });
            setIsOpen(true);
        } catch (e) {
            console.error(e);
            alert("No se pudo cargar la partitura");
        }
    }

    function closeModal() {
        if (saving) return;
        setIsOpen(false);
        setEditingId(null);
        setForm(empty);
    }

    function onChange(e) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    }

    async function handleSave(e) {
        e.preventDefault();
        if (!form.title.trim()) return alert("El título es obligatorio");
        if (!form.instrument_id) return alert("El instrumento es obligatorio");

        setSaving(true);
        try {
            const payload = {
                title: form.title.trim(),
                composer_id: form.composer_id ? Number(form.composer_id) : null,
                instrument_id: Number(form.instrument_id),
                file_path: form.file_path.trim(),
                file_type: form.file_type || "pdf",
            };

            if (editingId == null) {
                
                const { data } = await postScore(payload);
                await load();
            } else {
                
                const { data } = await updateScore(editingId, payload);
                await load();
            }

            closeModal();
        } catch (err) {
            console.error(err);
            alert("Error guardando la partitura");
        } finally {
            setSaving(false);
        }
    }

    function askDelete(row) {
        setConfirm({ open: true, id: row.id, title: row.title });
    }

    async function doDelete() {
        if (!confirm.id) return;
        try {
            await deleteScore(confirm.id);
            setConfirm({ open: false, id: null, title: "" });
            await load();
        } catch (e) {
            console.error(e);
            alert("No se pudo eliminar");
        }
    }

    async function handleFileUpload(e) {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            setUploading(true);

            const res = await upLoad(formData);
            const data = res?.data;  

            if (!data?.success) {
                alert(data?.message || "Error subiendo archivo");
                return;
            }

            setForm((f) => ({
                ...f,
                file_path: data.path,                     
                file_type: data.file_type || f.file_type,
            }));
        } catch (err) {
            console.error(err);
            alert("Error al subir el archivo");
        } finally {
            setUploading(false);
        }
    }


    return (
        <AdminLayout>
        <div className="scores-admin">
            <header className="scores-header card">
                <h1>Gestión de partituras</h1>
                <div className="header-actions">
                    <input
                        className="input"
                        placeholder="Buscar por título, tipo, compositor..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={openCreate}>
                        + Nueva partitura
                    </button>
                </div>
            </header>

            <div className="table-wrapper card">
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Título</th>
                                <th>Compositor</th>
                                <th>Instrumento</th>
                                <th>Archivo</th>
                                <th>Tipo</th>
                                <th className="th-actions">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((s) => (
                                <tr key={s.id}>
                                    <td data-label="Id">{s.id}</td>
                                    <td data-label="Título">{s.title}</td>
                                    <td data-label="Compositor">{s.composer_name ?? "—"}</td>
                                    <td data-label="Instrumento">{s.instrument_name ?? "—"}</td>
                                    <td data-label="Archivo">
                                        {s.file_path ? (
                                            <a
                                                className="link"
                                                target="_blank"
                                                rel="noreferrer"
                                                href={`/scores/${s.id}`}
                                            >
                                                Ver
                                            </a>
                                        ) : (
                                            "—"
                                        )}
                                    </td>
                                    <td data-label="Tipo">
                                        <span
                                            className={`chip ${s.file_type === "pdf" ? "chip-green" : "chip-orange"
                                                }`}
                                        >
                                            {s.file_type?.toUpperCase()}
                                        </span>
                                    </td>
                                    <td data-label="Acciones" className="actions">
                                        <button
                                            className="btn btn-ghost edit"
                                            onClick={() => openEdit(s.id)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="btn btn-danger delete"
                                            onClick={() => askDelete(s)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={7} style={{ textAlign: "center", padding: "1rem" }}>
                                        Sin resultados
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            
            {isOpen && (
                <div className="modal-backdrop" onClick={closeModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <header className="modal-header">
                            <h3>{editingId == null ? "Nueva partitura" : "Editar partitura"}</h3>
                            <button className="modal-close" onClick={closeModal} aria-label="Cerrar">✕</button>
                        </header>

                        <form className="form" onSubmit={handleSave}>
                            <div className="form-row">
                                <label>Título *</label>
                                <input
                                    name="title"
                                    className="input"
                                    value={form.title}
                                    onChange={onChange}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <label>Compositor</label>
                                <select
                                    name="composer_id"
                                    className="input"
                                    value={form.composer_id}
                                    onChange={onChange}
                                >
                                    <option value="">— Sin compositor —</option>
                                    {composers.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-row">
                                <label>Instrumento *</label>
                                <select
                                    name="instrument_id"
                                    className="input"
                                    value={form.instrument_id}
                                    onChange={onChange}
                                    required
                                >
                                    <option value="">Selecciona instrumento</option>
                                    {instruments.map((i) => (
                                        <option key={i.id} value={i.id}>
                                            {i.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-row">
                                <label>Archivo (PDF o imagen)</label>
                                <input
                                    type="file"
                                    accept=".pdf,image/*"
                                    className="input"
                                    onChange={handleFileUpload}
                                    disabled={uploading}
                                />
                                {uploading && <small className="help">Subiendo archivo…</small>}

                                {form.file_path ? (
                                    <small className="text-success">
                                        Archivo subido:{" "}
                                        <a href={form.file_path} target="_blank" rel="noreferrer">
                                            {form.file_path}
                                        </a>
                                    </small>
                                ) : (
                                    <small className="help">Puedes subir un PDF o una imagen.</small>
                                )}
                            </div>


                            <div className="form-row">
                                <label>Tipo *</label>
                                <select
                                    name="file_type"
                                    className="input"
                                    value={form.file_type}
                                    onChange={onChange}
                                    required
                                    disabled={!!form.file_path} 
                                    title={form.file_path ? "El tipo se detectó automáticamente al subir el archivo" : ""}
                                >
                                    <option value="pdf">PDF</option>
                                    <option value="image">IMAGE</option>
                                </select>
                            </div>

                            <footer className="modal-footer">
                                <button type="button" className="btn btn-ghost" onClick={closeModal} disabled={saving}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-primary" disabled={saving}>
                                    {saving ? "Guardando..." : editingId == null ? "Crear" : "Guardar cambios"}
                                </button>
                            </footer>
                        </form>
                    </div>
                </div>
            )}

            
            {confirm.open && (
                <div className="modal-backdrop" onClick={() => setConfirm({ open: false, id: null, title: "" })}>
                    <div className="modal small" onClick={(e) => e.stopPropagation()}>
                        <header className="modal-header">
                            <h3>Eliminar partitura</h3>
                            <button
                                className="modal-close"
                                onClick={() => setConfirm({ open: false, id: null, title: "" })}
                                aria-label="Cerrar"
                            >
                                ✕
                            </button>
                        </header>
                        <div className="modal-body">
                            <p>
                                ¿Seguro que deseas eliminar <strong>{confirm.title}</strong>? Esta acción no se puede deshacer.
                            </p>
                        </div>
                        <footer className="modal-footer">
                            <button
                                className="btn btn-ghost"
                                onClick={() => setConfirm({ open: false, id: null, title: "" })}
                            >
                                Cancelar
                            </button>
                            <button className="btn btn-danger" onClick={doDelete}>
                                Eliminar
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </div>
        </AdminLayout>
    );
}
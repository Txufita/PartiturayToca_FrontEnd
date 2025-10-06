import { useEffect, useMemo, useState } from "react";
import { getScore, getScores, postScore, updateScore, deleteScore } from "../../API/scores";
import "./Scores.css";

export default function ScoresAdmin() {
    const empty = {
        title: "",
        composer_id: "",
        instrument_id: "",
        file_path: "",
        file_type: ""
    }
    const [items, setItems] = useState([]);
    const [form, setForm] = useState(empty);
    const [editingId, setEditingId] = useState(null);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    async function load() {
        setLoading(true);
        try {
            const { data } = await getScores();
            setItems(data);

        } catch (error) {
            console.error("error cargando partituras ", error);
        }
        finally { setLoading(false) }
    }

    useEffect(() => {
        load();
    }, []);

    const filtered = useMemo(() => {
        const q = query.toLowerCase();
        return items.filter(
            s =>
                s.title.toLowerCase().includes(q) || (s.file_type || "").toLowerCase().includes(q)
        )
    }, [items, query]);
    return (
        <div className="scores-admin">
            <h1>Gestión de partituras</h1>


            {/*Tabla de partituras*/}

            <table className="card table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Título</th>
                        <th>Compositor</th>
                        <th>Instrumento</th>
                        <th>Archivo</th>
                        <th>Tipo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map(s=>(
                        <tr key={s.id}>
                            <td>{s.id}</td>
                            <td>{s.title}</td>
                            <td>{s.composer_name}</td>
                            <td>{s.instrument_name}</td>
                            <td>{s.file_path?(
                              <a className="link" target="_blank" href={s.file_path}>Ver</a>  
                            ):(
                               "_"                        
                            )}</td>
                            <td>{s.file_type}</td>
                            <td>
                                <button className="edit">Editar</button>
                                <button className="delete">Eliminar</button>
                            </td>
                        </tr>
                
                    ))}
                </tbody>
            </table>

        </div>
    )
}



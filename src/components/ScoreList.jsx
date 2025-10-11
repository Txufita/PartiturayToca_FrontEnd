import { useEffect, useMemo, useState } from "react";
import { getScores } from "../API/scores";
import { getInstruments } from "../API/instruments";
import { getComposers } from "../API/composers";
import ScoreCard from "./ScoreCard";
import "./ScoreList.css";

const PER_PAGE = 12;

export default function ScoreList() {
  const [scores, setScores] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [composers, setComposers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [error, setError] = useState(null);

  // filtros
  const [query, setQuery] = useState("");
  const [instrumentId, setInstrumentId] = useState("");
  const [composerId, setComposerId] = useState("");

  // paginación
  const [page, setPage] = useState(1);

  useEffect(() => {
    let alive = true;

    async function loadAll() {
      setLoading(true);
      setError(null);
      try {
        const [{ data: scoresData }] = await Promise.all([getScores()]);
        if (!alive) return;
        setScores(Array.isArray(scoresData) ? scoresData : scoresData?.scores || []);
      } catch (e) {
        if (alive) setError(e?.response?.data?.message || e?.message || "Error cargando partituras");
      } finally {
        if (alive) setLoading(false);
      }
    }

    async function loadFilters() {
      setLoadingFilters(true);
      try {
        const [{ data: ins }, { data: comps }] = await Promise.all([
          getInstruments(),
          getComposers(),
        ]);
        if (!alive) return;
        setInstruments(Array.isArray(ins) ? ins : ins?.instruments || []);
        setComposers(Array.isArray(comps) ? comps : comps?.composers || []);
      } catch {
      } finally {
        if (alive) setLoadingFilters(false);
      }
    }

    loadAll();
    loadFilters();
    return () => { alive = false; };
  }, []);

  const norm = (s) => String(s || "").toLocaleLowerCase();


  const getInstrumentIdFromScore = (s) => s.instrumentId ?? s.instrument?.id ?? s.instrument_id ?? "";
  const getComposerIdFromScore  = (s) => s.composerId  ?? s.composer?.id  ?? s.composer_id  ?? "";
  const getScoreName            = (s) => s.name ?? s.title ?? s.scoreName ?? "";

  // filtrar
  const filtered = useMemo(() => {
    const q = norm(query);
    return scores.filter((s) => {
      const matchName       = q ? norm(getScoreName(s)).includes(q) : true;
      const matchInstrument = instrumentId ? String(getInstrumentIdFromScore(s)) === String(instrumentId) : true;
      const matchComposer   = composerId  ? String(getComposerIdFromScore(s))  === String(composerId)   : true;
      return matchName && matchInstrument && matchComposer;
    });
  }, [scores, query, instrumentId, composerId]);

  useEffect(() => { setPage(1); }, [query, instrumentId, composerId]);

  // paginar
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const clampedPage = Math.min(page, totalPages);
  const start = (clampedPage - 1) * PER_PAGE;
  const end   = start + PER_PAGE;
  const pageItems = filtered.slice(start, end);

  const goToPage = (p) => {
    const n = Math.min(Math.max(1, p), totalPages);
    setPage(n);
    const grid = document.querySelector(".scores-grid");
    if (grid) grid.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (loading) return <div className="state">Cargando partituras…</div>;
  if (error)   return <div className="state error">{error}</div>;

  return (
    <>
      {/* Barra de búsqueda y filtros */}
      <section className="score-filters">
        <div className="filters-row">
          <div className="filter-field">
            <label htmlFor="q">Buscar partitura</label>
            <input
              id="q"
              type="text"
              placeholder="Nombre de la partitura…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="filter-field">
            <label htmlFor="instrument">Instrumento</label>
            <select
              id="instrument"
              value={instrumentId}
              onChange={(e) => setInstrumentId(e.target.value)}
              disabled={loadingFilters}
            >
              <option value="">Todos</option>
              {instruments.map((ins) => (
                <option key={ins.id} value={ins.id}>{ins.name}</option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label htmlFor="composer">Compositor</label>
            <select
              id="composer"
              value={composerId}
              onChange={(e) => setComposerId(e.target.value)}
              disabled={loadingFilters}
            >
              <option value="">Todos</option>
              {composers.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="filter-actions">
            <button
              className="btn-primary"
              onClick={() => { setQuery(""); setInstrumentId(""); setComposerId(""); }}
              type="button"
              title="Limpiar filtros"
            >
              Limpiar
            </button>
          </div>
        </div>
      </section>

      {/* Grid de resultados (4 columnas) */}
      {filtered.length === 0 ? (
        <div className="state">Sin resultados con los filtros aplicados.</div>
      ) : (
        <>
          <section className="scores-grid scores-grid--4">
            {pageItems.map((score) => (
              <ScoreCard key={score.id} score={score} />
            ))}
          </section>

          {/* Paginación */}
          <nav className="pagination" aria-label="Paginación de partituras">
            <button
              className="page-btn"
              onClick={() => goToPage(clampedPage - 1)}
              disabled={clampedPage === 1}
              aria-label="Anterior"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }).slice(0, 7).map((_, i) => {
              const p = i + 1;
              if (totalPages <= 7) {
                return (
                  <button
                    key={p}
                    className={"page-btn" + (p === clampedPage ? " is-active" : "")}
                    onClick={() => goToPage(p)}
                  >
                    {p}
                  </button>
                );
              } else {
                const set = new Set([1, 2, totalPages - 1, totalPages, clampedPage - 1, clampedPage, clampedPage + 1]);
                const pages = Array.from({ length: totalPages }, (_, n) => n + 1).filter(x => set.has(x));
                const compact = [];
                for (let k = 0; k < pages.length; k++) {
                  compact.push(pages[k]);
                  if (pages[k + 1] && pages[k + 1] - pages[k] > 1) compact.push("…");
                }
                return compact.map((v, idx) =>
                  typeof v === "number" ? (
                    <button
                      key={`${v}-${idx}`}
                      className={"page-btn" + (v === clampedPage ? " is-active" : "")}
                      onClick={() => goToPage(v)}
                    >
                      {v}
                    </button>
                  ) : (
                    <span key={`dots-${idx}`} className="page-dots">…</span>
                  )
                );
              }
            })}

            <button
              className="page-btn"
              onClick={() => goToPage(clampedPage + 1)}
              disabled={clampedPage === totalPages}
              aria-label="Siguiente"
            >
              ›
            </button>
          </nav>
        </>
      )}
    </>
  );
}
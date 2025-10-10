import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getScore } from "../API/scores";
import "./ScoreDetail.css";

export default function ScoreDetail() {
  const { id } = useParams();
  const [score, setScore] = useState(null);
  const BASE = import.meta.env.VITE_API_IMAGES_URL || "http://localhost:4000";

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getScore(id);
        setScore(data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  // loading único (los hooks van arriba)
  if (!score) return <p>Cargando...</p>;

  const FILE_URL = `${BASE.replace(/\/+$/, "")}${score.file_path}`; // http://localhost:4000/scores/xxx.pdf
  const SUGGESTED_NAME = `${score.title}.${score.file_type === "pdf" ? "pdf" : "jpg"}`;

  return (
    <section className="score-detail">
      <div className="score-media">
        {score.file_type === "pdf" ? (
          <iframe src={FILE_URL} title={score.title} />
        ) : (
          <img src={FILE_URL} alt={score.title} />
        )}
      </div>

      <div className="score-info card">
        <h1>{score.title}</h1>
        <p><strong>Compositor:</strong> {score.composer_name || "—"}</p>
        <p><strong>Instrumento:</strong> {score.instrument_name || "—"}</p>
        <p><strong>Tipo:</strong> {score.file_type.toUpperCase()}</p>

        <a target="_blank" href={FILE_URL} download={SUGGESTED_NAME} className="btn btn-primary">
          Descargar
        </a>
      </div>
    </section>
  );
}

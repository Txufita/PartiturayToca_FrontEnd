import { Link } from 'react-router-dom';
import "./Scores.css"

export default function ScoreCard({ score = {} }) {
    const { id, title, composer_name, instrument_name, file_type } = score;
    if (!id) return null;
    return (
        <div className="score-card">
            <header className="score-card-header">
                <h3 className="score-title">{title}</h3>
                <span className={`chip ${file_type === 'pdf' ? 'chip-green' : 'chip-orange'}`}>
                    {file_type?.toUpperCase()}
                </span>
            </header>

            <p className="score-meta">
                {composer_name || 'Unknown Composer'} — {instrument_name || 'Unknown Instrument'}
            </p>

            <footer className="score-card-footer">
                <Link className="btn btn-primary" to={`/scores/${id}`}>
                    Ya puedes tocarla
                </Link>
            </footer>
        </div>
    );

}

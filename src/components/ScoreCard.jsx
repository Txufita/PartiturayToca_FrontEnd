import {Link} from 'react-router-dom';
import "./Scores.css" 

export default function ScoreCard({ score = {} }) {
    const { id, title, composer_name, instrument_name, file_type } = score;
    if (!id) return null;
    return (
        <div className="score-card">
            <header className='score-card-header'>
                <h3 className='title'>{title}</h3>
                <span className="formato">{file_type}</span>
            </header>
            <p className='composer'>
                {composer_name || 'Unknown Composer'} - {instrument_name || 'Unknown Instrument'}
            </p>
            <footer className='score-card-footer'>
                <Link className='btn' to={`/scores/${id}`}>Ya puedes tocarla</Link>
            </footer>
        </div>
    );
}

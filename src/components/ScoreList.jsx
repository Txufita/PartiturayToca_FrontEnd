import { useEffect, useState } from 'react';
import { getScores } from '../API/scores';
import ScoreCard from './ScoreCard';
import './ScoreList.css';

export default function ScoreList() {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        getScores()
            .then(({ data }) => {
                console.log(data);
                
                if (isMounted) {
                    setScores(data)
                }
            })
            .catch((error) => {
                if (isMounted) {
                    setError(error.message)
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false)
                }
            })
    }, []);
    if (loading) {
        return <div className= "state">Cargando...</div>
    }
    if (error) {
        <div className='error'>{error}</div>
    }
    if (!scores.length) {
        <div className='state'>No hay partituras</div>
    }
    return (
        <section className="scores-grid">
            {scores.map((score)=> (
                <ScoreCard key={score.id} score={score}/>
            ))}
        </section>
    )
}

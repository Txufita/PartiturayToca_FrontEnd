import "./Hero.css" 

export default function Hero() { 
    return (
        <section className='hero'> {}
            <div className="hero-text"> 
                <h1>Partitura y Toca</h1> 
                <p>Te estabamos esperando hace ya un buen rato.</p> 
            </div>
            <figure className="hero-image">
                <img src="/portada.jpg" alt="Hero" />
            </figure>
        </section>
    );
}


import "./Hero.css"  // Importa o arquivo CSS para estilizar o componente Hero

export default function Hero() { // Define e exporta o componente funcional Hero
    return (
        <section className='hero'> {/*Seção principal com a classe 'hero'*/}
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


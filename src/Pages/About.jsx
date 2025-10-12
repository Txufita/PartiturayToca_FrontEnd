import "./About.css";

export default function About() {
    return (
        <section className="about-container">
            <div className="about-hero">
                <h1>Sobre Nosotros</h1>
                <p>Bienvenido a nuestra plataforma de partituras y tutoriales de piano. Aquí encontrarás una amplia variedad de
                    recursos para aprender y mejorar tus habilidades musicales.</p>
            </div>
            <div className="about-content">
                <h2>Nuestra Misión</h2>

                <p>Nuestra misión es proporcionar a los músicos de todo tipo acceso a partituras variadas para que puedan tocar todo aquellos que quieran. A largo plazo queremos ser una comunidad de músicos que compartamos tanto material como intereses, experiencias, y por qué no, toquemos juntos</p>
            </div>
            <div className="about-contact">
                <h2>Contacto</h2>
                <p>Si tienes alguna pregunta o sugerencia, no dudes en contactarnos a través de nuestro formulario de contacto o
                    enviándonos un correo electrónico a <a href="mailto: ejemplo@mail.com">aquí</a></p>
              
            </div>
        </section>
    );
}
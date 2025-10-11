import "./About.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function About() {
  return (
    <>
      <Header />
      <main className="about">
        {/* ===== Hero ===== */}
        <section className="hero">
          <div className="hero-text">
            <h1>Partitura y Toca</h1>
            <p>
              Una plataforma creada por y para músicos. Reúne partituras
              seleccionadas, herramientas de estudio y una comunidad que
              comparte el mismo objetivo: <strong>aprender y disfrutar tocando</strong>.
            </p>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1400&auto=format&fit=crop"
              alt="Pianista practicando con partitura"
              loading="lazy"
            />
          </div>
        </section>

        {/* ===== Mission / Vision cards ===== */}
        <section className="cards">
          <article className="card">
            <div className="card-icon">🎯</div>
            <h3>Nuestra misión</h3>
            <p>
              Democratizar el acceso a <strong>partituras de calidad</strong> y
              ofrecer <strong>recursos claros</strong> para que cualquier persona,
              desde principiante hasta avanzada, pueda progresar con confianza.
            </p>
          </article>

          <article className="card">
            <div className="card-icon">🌱</div>
            <h3>Nuestro enfoque</h3>
            <p>
              Curación de contenidos, <strong>buen diseño</strong> y una
              experiencia simple. Menos ruido, más música: aprende, practica y
              comparte.
            </p>
          </article>

          <article className="card">
            <div className="card-icon">🤝</div>
            <h3>Comunidad</h3>
            <p>
              Creamos espacios para <strong>comentar, sugerir</strong> y
              construir juntos. Tu feedback guía el roadmap.
            </p>
          </article>
        </section>

        {/* ===== Stats ===== */}
        <section className="stats">
          <div className="stat">
            <span className="stat-number">1.5k+</span>
            <span className="stat-label">Partituras curadas</span>
          </div>
          <div className="stat">
            <span className="stat-number">300k+</span>
            <span className="stat-label">Minutos de práctica</span>
          </div>
          <div className="stat">
            <span className="stat-number">120+</span>
            <span className="stat-label">Compositores</span>
          </div>
          <div className="stat">
            <span className="stat-number">45</span>
            <span className="stat-label">Instrumentos</span>
          </div>
        </section>

        {/* ===== Timeline ===== */}
        <section className="timeline">
          <h2>Cómo hemos llegado hasta aquí</h2>
          <ol className="timeline-list">
            <li>
              <div className="dot" />
              <div className="tl-content">
                <h4>Idea inicial</h4>
                <p>
                  Un lugar único para encontrar partituras fiables sin perder
                  tiempo entre enlaces rotos.
                </p>
              </div>
            </li>
            <li>
              <div className="dot" />
              <div className="tl-content">
                <h4>Primer prototipo</h4>
                <p>
                  Subimos un catálogo reducido y medimos qué necesitaba la
                  comunidad para estudiar mejor.
                </p>
              </div>
            </li>
            <li>
              <div className="dot" />
              <div className="tl-content">
                <h4>Panel de administración</h4>
                <p>
                  Creamos herramientas internas para <strong>gestionar partituras,
                  compositores e instrumentos</strong> de forma ágil.
                </p>
              </div>
            </li>
            <li>
              <div className="dot" />
              <div className="tl-content">
                <h4>Expansión del catálogo</h4>
                <p>
                  Añadimos <strong>más estilos y niveles</strong>, y optimizamos
                  búsquedas y filtros.
                </p>
              </div>
            </li>
          </ol>
        </section>

        {/* ===== FAQ ===== */}
        <section className="faq">
          <h2>Preguntas frecuentes</h2>
          <details className="faq-item">
            <summary>¿Las partituras son gratuitas?</summary>
            <p>
              Ofrecemos una mezcla de material gratuito y contenido curado. Si
              alguna obra está sujeta a derechos, lo indicamos claramente.
            </p>
          </details>
          <details className="faq-item">
            <summary>¿Qué instrumentos cubrís?</summary>
            <p>
              Empezamos por <strong>piano</strong> y ampliamos a instrumentos
              de cuerda y viento. Puedes ver el listado completo en el panel.
            </p>
          </details>
          <details className="faq-item">
            <summary>¿Puedo sugerir partituras?</summary>
            <p>
              ¡Sí! Nos encanta recibir sugerencias. Escríbenos o abre una
              solicitud desde tu perfil.
            </p>
          </details>
        </section>

        {/* ===== Contact / CTA ===== */}
        <section className="cta">
          <div className="cta-box">
            <h3>¿Tienes dudas o propuestas?</h3>
            <p>
              Escríbenos:{" "}
              <a href="mailto:ejemplo@mail.com">ejemplo@mail.com</a> o usa el
              formulario de contacto. ¡Hablemos!
            </p>
            <div className="cta-actions">
              <a className="btn btn-primary" href="/">Explorar partituras</a>
              <a className="btn btn-ghost" href="/about">Conocer más</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
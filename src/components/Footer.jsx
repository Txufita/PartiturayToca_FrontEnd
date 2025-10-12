import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-glow footer-glow--green" />
      <div className="footer-glow footer-glow--orange" />

      <div className="footer-inner">
       
        <div className="footer-col">
          <div className="brand">
            <span className="brand-logo">🎼</span>
            <span className="brand-name">Partitura y Toca</span>
          </div>
          <p className="muted">
            Aprende, practica y comparte. Partituras curadas y herramientas
            de estudio para todos los niveles.
          </p>
        </div>

        
        <nav className="footer-col">
          <h4>Enlaces</h4>
          <ul className="links">
            <li><a href="/">Inicio</a></li>
            <li><a href="/#">Partituras</a></li>
            <li><a href="/about">Sobre nosotros</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </nav>
        <nav className="footer-col">
          <h4>Explorar</h4>
          <ul className="links">
            <li><a href="#">Clásico</a></li>
            <li><a href="#">Jazz</a></li>
            <li><a href="#">Piano</a></li>
            <li><a href="#">Violín</a></li>
          </ul>
        </nav>

        
        <div className="footer-col">
          <h4>Newsletter</h4>
          <p className="muted">Novedades y partituras destacadas.</p>
          <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="tuemail@ejemplo.com"
              aria-label="Correo electrónico"
            />
            <button className="btn-primary">Suscribirme</button>
          </form>

          <div className="social">
            <a aria-label="Twitter" href="#" title="Twitter">
              <img className="redes" src="/x.svg" alt="" />
            </a>
            <a aria-label="YouTube" href="#" title="YouTube">
               <img className="redes" src="/youtube.svg" alt="" />
            </a>
            <a aria-label="Instagram" href="#" title="Instagram">
               <img className="redes" src="/instagram.svg" alt="" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Partitura y Toca</span>
        <div className="legal">
          <a href="#">Privacidad</a>
          <span>·</span>
          <a href="#">Términos</a>
          <span>·</span>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
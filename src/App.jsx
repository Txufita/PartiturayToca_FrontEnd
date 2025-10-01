import './App.css' // Importa o arquivo CSS para estilizar o componente App
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Importa componentes do react-router-dom para roteamento
import Home from './Pages/Home'; // Importa o componente Home da pasta Pages
import Register from './Pages/register'; // Importa o componente Register da pasta Pages
import Login from './Pages/login'; // Importa o componente Login da pasta Pages
import About from './Pages/About';
import Header from './components/Header'; // Importa o componente Header da pasta components


function App() {

  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </div>
  )
}

export default App // Exporta o componente App como padrão

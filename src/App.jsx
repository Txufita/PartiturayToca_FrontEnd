import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Register from './Pages/register';
import Login from './Pages/login';
import About from './Pages/About';
import Header from './components/Header';
import ScoresAdmin from './Pages/Admin/Scores';
import ProtectedRoute from './Router/ProtectedRoute';


function App() {

  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route element={<ProtectedRoute requireAdmin={true} />}>
          <Route path="/admin/scores" element={<ScoresAdmin />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App 

import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  
import Home from './Pages/Home';
import Register from './Pages/register'; 
import Login from './Pages/Login';
import About from './Pages/About';
import AdminHome from "./pages/admin/Home";
import ScoresAdmin from './Pages/Admin/Scores';
import ProtectedRoute from './Router/ProtectedRoute';
import ScoreDetail from './Pages/ScoreDetail';
import InstrumentsAdmin from './Pages/Admin/Instruments';
import ComposersAdmin from './Pages/Admin/Composers';


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route element={<ProtectedRoute requireAdmin={true} />}>
          <Route path="/admin/scores" element={<ScoresAdmin />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/scores" element={<div>Scores</div>} />
          <Route path="/admin/instruments" element={<InstrumentsAdmin />} />
          <Route path="/admin/composers" element={<ComposersAdmin/>} />
          <Route path="/admin" element={<Navigate to="/admin/home" replace />} />
        </Route>
        <Route path="/scores/:id" element={<ScoreDetail />} />
      </Routes>
    </div>
  )
}

export default App 
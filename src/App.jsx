import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RetosProvider } from './context/RetosContext';
import Navbar from './components/Navbar';
import RutaPrivada from './components/RutaPrivada';

// Páginas
import Login from './pages/Login';
import Registro from './pages/Registro';
import DashboardDispatcher from './pages/DashboardDispatcher';
import DashboardEmpresa from './pages/DashboardEmpresa';
import DashboardEstudiante from './pages/DashboardEstudiante';

function App() {
  return (
    <AuthProvider>
      <RetosProvider>
        <BrowserRouter>
        <div className="app-container">
          {/* Barra de navegación superior visible en toda la app */}
          <Navbar />

          {/* Contenido principal con las rutas */}
          <main className="main-layout">
            <Routes>
              {/* =========================================
                  1. RUTAS PÚBLICAS (Accesibles sin login)
                 ========================================= */}
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />

              {/* =========================================
                  2. RUTAS PRIVADAS / PROTEGIDAS
                  (Requisito: Solo accesibles con login)
                 ========================================= */}
              <Route element={<RutaPrivada />}>
                {/* Dashboard principal inteligente: detecta rol Empresa o Estudiante */}
                <Route path="/dashboard" element={<DashboardDispatcher />} />
                
                {/* Rutas directas específicas por rol si se desean visitar */}
                <Route path="/dashboard/empresa" element={<DashboardEmpresa />} />
                <Route path="/dashboard/estudiante" element={<DashboardEstudiante />} />
              </Route>

              {/* =========================================
                  3. REDIRECCIONES POR DEFECTO
                 ========================================= */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      </RetosProvider>
    </AuthProvider>
  );
}

export default App;

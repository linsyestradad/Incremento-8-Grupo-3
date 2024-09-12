import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useLocation, Link, Navigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import './App.css';
import logo from './ebenezer/picture/volquete.png';
import usuario from './ebenezer/picture/usuario.png';
import usuario2 from './ebenezer/picture/user.png';
import inventario from './ebenezer/picture/inventory.png';
import ventas from './ebenezer/picture/sales.png';
import cliente from './ebenezer/picture/clients.png';
import proveedores from './ebenezer/picture/suppliers.png';
import personal from './ebenezer/picture/staff.png';
import CompShowUsuario from './ebenezer/ShowUsuario.js';
import CompCreateUsuario from './ebenezer/CreateUsuario.js';
import CompEditUsuario from './ebenezer/EditUsuario.js';
import Login from './ebenezer/login.js';
import PrivateRoute from './ebenezer/privateroute.js';
import CompShowCliente from './ebenezer/ShowCliente.js';
import CompCreateCliente from './ebenezer/CreateCliente.js';
import CompEditCliente from './ebenezer/EditCliente.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [showLogin, setShowLogin] = useState(!isAuthenticated);

  const handleLoginSuccess = () => {
    console.log('Login exitoso');
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    console.log('Cerrando sesión');
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header onLogout={handleLogout} />

        {/* Modal para el login */}
        <ReactModal isOpen={showLogin} onRequestClose={() => setShowLogin(false)}>
          <Login
            onLoginSuccess={handleLoginSuccess}
            onClose={() => setShowLogin(false)}
          />
        </ReactModal>

        <Routes>
          {/* Ruta para el login */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

          {/* Ruta para la página de inicio o contenido principal */}
          <Route
            path="/"
            element={isAuthenticated ? <MainContent /> : <Navigate to="/login" />}
          />

          {/* Rutas de Gestión de Usuarios */}
          <Route
            path="/usuario/create"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CompCreateUsuario />
              </PrivateRoute>
            }
          />
          <Route
            path="/usuario/edit/:id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CompEditUsuario />
              </PrivateRoute>
            }
          />
          <Route
            path="/usuario/gestion-usuarios"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CompShowUsuario />
              </PrivateRoute>
            }
          />

          {/* Rutas de Gestión de Clientes */}
          <Route
            path="/cliente/create"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CompCreateCliente />
              </PrivateRoute>
            }
          />
          <Route
            path="/cliente/edit/:id"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CompEditCliente />
              </PrivateRoute>
            }
          />
          <Route
            path="/cliente/gestion-clientes"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CompShowCliente />
              </PrivateRoute>
            }
          />

          {/* Otras rutas */}
          <Route
            path="/proveedores"
            element={<PrivateRoute isAuthenticated={isAuthenticated}><h1>Gestión de Proveedores (Próximamente)</h1></PrivateRoute>}
          />
          <Route
            path="/personal"
            element={<PrivateRoute isAuthenticated={isAuthenticated}><h1>Gestión de Personal (Próximamente)</h1></PrivateRoute>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Componente para el Header
function Header({ onLogout }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isInModule = [
    '/inventario',
    '/ventas',
    '/proveedores',
    '/personal',
    '/usuario/gestion-usuarios',
    '/cliente/gestion-clientes'
  ].includes(location.pathname);

  useEffect(() => {
    if (!isInModule) {
      setIsNavOpen(false);
    }
  }, [location.pathname, isInModule]);

  const handleMouseEnterNav = () => {
    if (isInModule) {
      setIsNavOpen(true);
    }
  };

  const handleMouseLeaveNav = () => {
    setIsNavOpen(false);
  };

  const handleNavItemClick = (path) => {
    navigate(path);
    setIsNavOpen(false); // Cerrar el menú después de la navegación
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <header className="App-header">
      <div
        className="logo"
        onMouseEnter={handleMouseEnterNav}
      >
        <img
          src={logo}
          alt="Logo"
          className="App-logo"
        />
      </div>

      <div className="user-menu">
        <img
          src={usuario}
          alt="Perfil de Usuario"
          className="profile-icon"
          onClick={handleUserMenuToggle}
        />
        {isUserMenuOpen && (
          <div className="user-dropdown-menu">
            <button onClick={onLogout} className="user-menu-item">Cerrar Sesión</button>
          </div>
        )}
      </div>

      <nav
        className={`side-nav ${isNavOpen ? 'open' : ''}`}
        onMouseEnter={handleMouseEnterNav}
        onMouseLeave={handleMouseLeaveNav}
      >
        <ul>
          <li onClick={() => handleNavItemClick('/')}>
            Inicio
          </li>
          <li onClick={() => handleNavItemClick('/inventario')}>
            Gestión de Inventario
          </li>
          <li onClick={() => handleNavItemClick('/ventas')}>
            Gestión de Ventas
          </li>
          <li onClick={() => handleNavItemClick('/proveedores')}>
            Gestión de Proveedores
          </li>
          <li onClick={() => handleNavItemClick('/personal')}>
            Gestión de Personal
          </li>
          <li onClick={() => handleNavItemClick('/usuario/gestion-usuarios')}>
            Gestión de Usuarios
          </li>
          <li onClick={() => handleNavItemClick('/cliente/gestion-clientes')}>
            Gestión de Clientes
          </li>
        </ul>
      </nav>
    </header>
  );
}

// Componente para el contenido principal
function MainContent() {
  return (
    <main className="App-main">
      <h2>Bienvenido a la plataforma</h2>
      <p>Aquí encontrarás todos los módulos disponibles.</p>

      <div className="module-buttons">
        <div className="module-card">
          <img src={inventario} alt="Gestión de Inventario" />
          <h3>Gestión de Inventario</h3>
          <p>Próximamente</p>
        </div>
        <div className="module-card">
          <Link to="/cliente/gestion-clientes" className="btn-module">
            <img src={cliente} alt="Gestión de Clientes" />
            <h3>Gestión de Clientes</h3>
          </Link>
        </div>
        <div className="module-card">
          <img src={ventas} alt="Gestión de Ventas" />
          <h3>Gestión de Ventas</h3>
          <p>Próximamente</p>
        </div>
        <div className="module-card">
          <img src={proveedores} alt="Gestión de Proveedores" />
          <h3>Gestión de Proveedores</h3>
          <p>Próximamente</p>
        </div>
        <div className="module-card">
          <img src={personal} alt="Gestión de Personal" />
          <h3>Gestión de Personal</h3>
          <p>Próximamente</p>
        </div>
        <div className="module-card">
          <Link to="/usuario/gestion-usuarios" className="btn-module">
            <img src={usuario2} alt="Gestión de Usuarios" />
            <h3>Gestión de Usuarios</h3>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default App;
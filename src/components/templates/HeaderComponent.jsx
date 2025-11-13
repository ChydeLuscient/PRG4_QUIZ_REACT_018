import React from 'react';
import { Link } from 'react-router-dom';

function HeaderComponent() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          🛍️ Inovasi Informatika
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                🏠 Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/list-produk">
                📦 Inovasi
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tambah-produk">
                ➕ Tambah Inovasi
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link text-warning" to="/debug-api">
                🔧 Debug API
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HeaderComponent;
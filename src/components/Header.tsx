import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header: React.FC = () => {
  const location = useLocation();
  const navLinkClass = (path: string) =>
    location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">ExploraTudo</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className={navLinkClass('/jokes')} to="/jokes">Pokémon</Link>
            </li>
            <li className="nav-item">
              <Link className={navLinkClass('/trivia')} to="/trivia">Quiz</Link>
            </li>
            <li className="nav-item">
              <Link className={navLinkClass('/exchange')} to="/exchange">Clima</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

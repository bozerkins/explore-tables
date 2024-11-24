/* App.tsx */
import { Route, Link, Routes, Navigate, HashRouter } from 'react-router-dom';
import './App.css';
import '../public/themes/default.css';
import Randomized from "./pages/Randomized";
import Tests from "./pages/Tests";
import React from 'react';
import Interactive from './pages/Interactive';
import Home from './pages/Home';
import Styled from './pages/Styled';
import Sorted from './pages/Sorted';
import GettingStarted from './pages/GettingStarted';
import Themes from './pages/Themes';

const App: React.FC = () => {
    return (
        <HashRouter basename="/" future={{ v7_startTransition: true }}>
            <div className="app">
                {/* Header */}
                <header className="header">
                    <div className="header-left">
                        <h1>Explore Tables</h1>
                    </div>
                    <nav className="header-nav">
                        <ul className="nav-links">
                            <li><Link to="/">Getting Started</Link></li>
                            <li><Link to="/themes">Themes</Link></li>
                            <li><Link to="/styled">Styled</Link></li>
                            <li><Link to="/sorted">Sorted</Link></li>
                            <li><Link to="/randomized">Randomized</Link></li>
                            <li><Link to="/tests">Tests</Link></li>
                            <li><Link to="/interactive">Interactive</Link></li>
                        </ul>
                    </nav>
                    <a
                        href="https://github.com/bozerkins/explore-tables"
                        className="github-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View source on GitHub"
                    >
                        <i className="fab fa-github"></i>
                    </a>
                </header>

                {/* Routes for each Demo */}
                <Routes>
                    <Route path="/" element={<GettingStarted />} /> Getting Started
                    <Route path="/themes" element={<Themes />} /> Themes
                    <Route path="/styled" element={<Styled />} /> Styled
                    <Route path="/sorted" element={<Sorted />} /> Sorted
                    <Route path="/randomized" element={<Randomized />} /> Randomized
                    <Route path="/tests" element={<Tests />} /> Tests
                    <Route path="/interactive" element={<Interactive />} /> Interactive
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>

                {/* Footer */}
                <footer className="footer">
                    <p>&copy; 2024 Pivot Table Demo Page</p>
                </footer>
            </div>
        </HashRouter>
    );
};

export default App;
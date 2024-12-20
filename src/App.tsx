/* App.tsx */
import { Route, Link, Routes, Navigate, HashRouter, useLocation } from 'react-router-dom';
import './App.css';
import '../public/themes/default.css';
import Tests from "./pages/Tests";
import React, { useEffect } from 'react';
import Interactive from './pages/Interactive';
import Sorted from './pages/Sorted';
import GettingStarted from './pages/GettingStarted';
import Themes from './pages/Themes';
import Styled from './pages/Styled';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

const App: React.FC = () => {
    return (
        <HashRouter basename="/" future={{ v7_startTransition: true }}>
            <ScrollToTop />
            <div className="app">
                {/* Header */}
                <header className="header">
                    <div className="header-left">
                        <Link to="/" className="header-title-link">
                            <h1>Explore Tables</h1>
                        </Link>
                    </div>
                    <nav className="header-nav">
                        <ul className="nav-links">
                            <li><Link to="/">Getting Started</Link></li>
                            <li><Link to="/themes">Themes</Link></li>
                            <li><Link to="/styled">Styled</Link></li>
                            <li><Link to="/sorted">Sorted</Link></li>
                            <li><Link to="/interactive">Interactive</Link></li>
                            <li><Link to="/tests">Tests</Link></li>
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
                    <Route path="/tests" element={<Tests />} /> Tests
                    <Route path="/interactive" element={<Interactive />} /> Interactive
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>

                {/* Footer */}
                <footer className="footer">
                    <div className="footer-left">
                        <p>&copy; 2024 Explore Tables</p>
                    </div>
                    <div className="footer-right">
                        <p className="footer-ai">Made with <i className="fa-solid fa-robot"></i> Amazon Q AI Assistant</p>
                    </div>
                </footer>

            </div>
        </HashRouter>
    );
};

export default App;
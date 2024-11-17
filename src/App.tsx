import { Route, Link, Routes, Navigate, HashRouter } from 'react-router-dom';
import Randomized from "./pages/Randomized";
import Tests from "./pages/Tests";
import React from 'react';
import Interactive from './pages/Interactive';
import Home from './pages/Home';
import '../public/themes/default.css';
import Styled from './pages/Styled';

const App: React.FC = () => {
    return (
        <HashRouter basename="/" future={{ v7_startTransition: true }}>
            <div className="app">
                {/* Header */}
                <header className="header">
                    <h1>Explore Table - Live Demo</h1>
                </header>

                {/* Main Content Area with Links to Demos */}
                <main className="mainContent">
                    <h2 style={{ paddingBottom: "15px" }}>Explore Tables</h2>
                    <p style={{ paddingBottom: "20px" }}>Pivot tables made easy. Select a demo to view different pivot table functionalities:</p>
                    <ul className="demoLinks">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/styled">Styled</Link></li>
                        <li><Link to="/randomized">Randomized</Link></li>
                        <li><Link to="/tests">Tests</Link></li>
                        <li><Link to="/interactive">Interactive</Link></li>
                    </ul>
                </main>

                {/* Routes for each Demo */}
                <Routes>
                    <Route path="/" element={<Home />} /> Home
                    <Route path="/styled" element={<Styled />} /> Home
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
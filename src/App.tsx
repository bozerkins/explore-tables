import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Tests from "./pages/Tests";
import React from 'react';
import Interactive from './pages/Interactive';

const App: React.FC = () => {
    return (
        <Router>
            <link rel="stylesheet" href="themes/default.css" type="text/css" />
            <div className="app">
                {/* Header */}
                <header className="header">
                    <h1>Pivot Table Demo Page</h1>
                </header>

                {/* Main Content Area with Links to Demos */}
                <main className="mainContent">
                    <h2>Explore Pivot Table Demos</h2>
                    <p>Select a demo to view different pivot table functionalities:</p>
                    <ul className="demoLinks">
                        <li><Link to="/randomized">Randomized</Link></li>
                        <li><Link to="/tests">Tests</Link></li>
                        <li><Link to="/interactive">Interactive</Link></li>
                    </ul>
                </main>

                {/* Routes for each Demo */}
                <Routes>
                    <Route path="/" element={<div></div>} /> Home
                    <Route path="/randomized" element={<Home />} /> Randomized
                    <Route path="/tests" element={<Tests />} /> Tests
                    <Route path="/interactive" element={<Interactive />} /> Interactive
                </Routes>

                {/* Footer */}
                <footer className="footer">
                    <p>&copy; 2024 Pivot Table Demo Page</p>
                </footer>
            </div>
        </Router>

    );
};

export default App;
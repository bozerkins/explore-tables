import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Tests from "./pages/Tests";

const App: React.FC = () => {
    return <>
        <link rel="stylesheet" href="themes/default.css" type="text/css" />
        <Router>
            <Routes>
                <Route path="/" element={<Home />} /> Home
                <Route path="/tests" element={<Tests />} /> Tests
            </Routes>
        </Router>
    </>
}

export default App;
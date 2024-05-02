import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import SalesDetailsPage from "./pages/SalesDetailsPage";
import SalesPerformancePage from "./pages/SalesPerformancePage";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout><HomePage /></Layout>} />
                <Route path="/sales-performance" element={<Layout><SalesPerformancePage /></Layout>} />
                <Route path="/sales-details" element={<Layout><SalesDetailsPage /></Layout>} />
            </Routes>
        </Router>
    );
}

export default App;
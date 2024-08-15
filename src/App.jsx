import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Places from "./user/pages/Places";
import NewPlace from "./places/pages/NewPlace";
import Navbar from "./shared/components/Navigation/Navbar";
import Footer from "./shared/components/Footer/Footer";

function App() {
    return (
        <>
            <Navbar></Navbar>
            <Router>
                <Routes>
                    <Route path="/" element={<Places />} />
                    <Route path="/places/new" element={<NewPlace />} />
                    <Route path="*" element={<Places />} />
                </Routes>
            </Router>
            <Footer></Footer>
        </>
    );
}

export default App;

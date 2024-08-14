import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Places from "./user/pages/Places";
import NewPlace from "./places/pages/NewPlace";
import "./App.css";
import Navbar from "./shared/components/Navbar";
import Footer from "./shared/components/Footer";

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

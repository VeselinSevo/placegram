import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Users from "./user/pages/Users";
import NewPlace from "./places/pages/NewPlace";
import "./App.css";
import Navbar from "./shared/components/Navbar";

function App() {
    return (
        <>
            <Navbar></Navbar>
            <Router>
                <Routes>
                    <Route path="/" element={<Users />} />
                    <Route path="/places/new" element={<NewPlace />} />
                    <Route path="*" element={<Users />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;

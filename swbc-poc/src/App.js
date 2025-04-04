import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Upload from './components/Upload';
import Dashboard from './components/Dashboard';
import FileView from './components/FileView';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/file/:id" element={<FileView />} /> 
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </Router>
  );
}

export default App;
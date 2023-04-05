import './App.css';
import {Routes, Route} from 'react-router-dom';
import Home from './composants/Home';
import Users from './composants/Users';
import Profile from './composants/Profile';
import Navbar from './composants/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:id" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;

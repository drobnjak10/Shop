import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { AuthConsumer } from './AuthContext';
import Dashboard from './pages/Dashboard';
import NewProduct from './pages/DashboardMenu/NewProduct';
import {useAlert} from 'react-alert'
import ProductDetails from './pages/ProductDetails';

function App() {
  const { authed, admin } = AuthConsumer();
  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/dashboard" element={authed ? <Dashboard /> : <Navigate to="/signin" />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/dashboard/new" element={authed ? <NewProduct /> : <Navigate to="/signin" />} /> */}
        <Route path="/dashboard/new" element={authed ? <NewProduct /> : <Navigate to="/" />} />
        <Route path="/signin" element={authed ? <Navigate to="/" /> : <SignIn />} />
      </Routes>
    </Router>
  );
}

export default App;

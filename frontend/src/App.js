import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { AuthConsumer } from './AuthContext';
import Dashboard from './pages/Dashboard';
import NewProduct from './pages/DashboardMenu/NewProduct';
import { useAlert } from 'react-alert'
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentMethod from './pages/PaymentMethod';
import PlaceOrder from './pages/PlaceOrder';

function App() {
  const { authed, isAdmin } = AuthConsumer();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/dashboard" element={authed ? <Dashboard /> : <Navigate to="/signin" />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/dashboard/new" element={authed ? <NewProduct /> : <Navigate to="/signin" />} /> */}
        <Route path="/dashboard/new" element={authed ? <NewProduct /> : <Navigate to="/" />} />
        <Route path="/signin" element={authed ? <Navigate to="/" /> : <SignIn />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<PaymentMethod />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
      </Routes>
    </Router>
  );
}

export default App;

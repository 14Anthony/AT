import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage'
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import UserListAdminPage from './pages/UserListAdminPage';
import UserEditAdminPage from './pages/UserEditAdminPage';
import ProductListAdminPage from './pages/ProductListAdminPage';

import { Container } from 'react-bootstrap';

const App = () => {
  return (
    <Router>

      <>
        <Header />

        <main className='py-3'>

          <Container>

            <Route path='/order/:id' component={OrderPage} />

            <Route path='/placeorder' component={PlaceOrderPage} />

            <Route path='/payment' component={PaymentPage} />

            <Route path='/shipping' component={ShippingPage} />

            <Route path='/register' component={RegisterPage} />

            <Route path='/login' component={LoginPage} />

            <Route path='/profile' component={ProfilePage} />

            <Route path='/admin' component={AdminPage} />

            <Route path='/product/:id' component={ProductPage} />

            <Route path='/cart/:id?' component={CartPage} />

            <Route path='/admin/userlist' component={UserListAdminPage} />

            <Route path='/admin/user/:id/edit' component={UserEditAdminPage} />

            <Route path='/admin/productlist' component={ProductListAdminPage} />

            <Route path='/' component={HomePage} exact />

          </Container>

        </main>

        <Footer />

      </>

    </Router>
  );
}

export default App;

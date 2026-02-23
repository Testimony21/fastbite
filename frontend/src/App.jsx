import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import HomeHero from './components/hero/HomeHero';
import HowToOrder from './components/HowToOrder/HowToOrder';
import './App.css';
import YourTime from './components/YourTime/YourTime';
import Footer from './components/Footer/Footer';
import BackToTop from './components/BackToTop/BackToTop';
import CorporateTestimonials from './components/CorporateTestimonials/CorporateTestimonials';
import GetStarted from './components/CorporateGetStarted/CorporateGetStarted';
import './components/CorporateGetStarted/FormModal/FormModal';
import PartnerWithUs from './pages/Partner/PartnerWithUs';
import './pages/Partner/PartnerWithUs.css';
import PartnerNavbar from "./pages/Partner/PartnerNavbar/PartnerNavbar";
import PartnerWhyFastBite from './pages/Partner/PartnerWhyFastBite/PartnerWhyFastBite';
import PartnerGetWithUs from './pages/Partner/PartnerGetWithUs/PartnerGetWithUs';
import './pages/Partner/PartnerHowToGetStarted/PartnerHowToGetStarted';
import './pages/Partner/PartnerReview/PartnerReview';
import PartnerFaq from './pages/Partner/PartnerFaq/PartnerFaq';
import PartnerFooter from './pages/Partner/PartnerFooter/PartnerFooter';
import PartnerAuth from './pages/Partner/PartnerAuth/PartnerAuth';
import PartnerForgotPassword from './pages/Partner/PartnerAuth/PartnerForgotPassword/PartnerForgotPassword';
import PartnerLayout from './pages/Partner/PartnerLayout/PartnerLayout';
// import BecomeACourier from './pages/BecomeACourier/BecomeACourier';
// import BecomeWhyDeliver from './pages/BecomeACourier/BecomeACourier';
// import BecomeRequirements from './pages/BecomeACourier/BecomeRequirements/BecomeRequirements';
// import BecomeQuestions from './pages/BecomeACourier/BecomeQuestions/BecomeQuestions';
import UploadForm from './pages/Partner/UploadForm/UploadForm';
import Dashboard from "./pages/Dashboard/Dashboard";
import RestaurantsPage from './pages/RestaurantsPage/RestaurantsPage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import CourierRegister from './pages/BecomeACourier/CourierRegister/CourierRegister';
import RestaurantMenuPage from './pages/RestaurantMenuPage/RestaurantMenuPage';
import CartPage from './pages/CartPage/CartPage';
import { CartProvider } from './Context/CartContext';
import { LoadingProvider } from './Context/LoadingContext/LoadingContext'
import GlobalLoader from './components/GlobalLoader/GlobalLoader';
import Checkout from './pages/Checkout/Checkout';
import FakePayment from './pages/FakePayment';
import OrderSuccess from './pages/OrderSuccess';
import PartnerRoutes from './pages/routes/PartnerRoutes/PartnerRoutes';

function AppContent() {
  const location = useLocation();

  // Pages with NO footer
  const noFooterRoutes = ["/login", "/forgot-password", "/signup", "/become-a-courier", "/courier-register", "/fake-payment", "/checkout", "/order-success", "/cart"];

  const partnerRoutes = ["/partner-with-us"];

  const partnerFooterRoutes = ["/corporate-ordering"];

  const renderNavbar = () => {
    if (location.pathname === "/login" || location.pathname === "/forgot-password" || location.pathname === "/signup" || location.pathname === "/partner/dashboard" || location.pathname === "/restaurants" || location.pathname === "/courier-register" || location.pathname.startsWith("/restaurants/") || location.pathname === "/cart" || location.pathname === "/checkout" || location.pathname === "/fake-payment" || location.pathname === "/order-success") {
      return <Navbar minimal />;
    }
    if (partnerRoutes.includes(location.pathname)) {
      return null;
    }
    return <Navbar />;
  };

  const renderFooter = () => {
    if (noFooterRoutes.includes(location.pathname)) return null;
    if (partnerRoutes.includes(location.pathname)) return null;
    if (partnerFooterRoutes.includes(location.pathname)) return <PartnerFooter />;
    return <Footer />;
  };

  return (
    <CartProvider>
      <GlobalLoader />
      {renderNavbar()}

      <main>

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/partner-with-us" element={<PartnerLayout />}>
            <Route index element={<PartnerWithUs />} />

          </Route>
          {/* <Route path="/partner/dashboard" element={<Dashboard />} /> */}

          {/* <Route path="/become-a-courier" element={<BecomeACourier />} /> */}
          {/* <Route path="/courier-register" element={<CourierRegister />} /> */}

          <Route path="/cart" element={<CartPage />} />

          <Route path="/login" element={<PartnerAuth />} />
          <Route path="/forgot-password" element={<PartnerForgotPassword />} />
          <Route path="/signup" element={<PartnerAuth />} />
          <Route path='/uploadform' element={<UploadForm />} />
          <Route path='/restaurants' element={<RestaurantsPage />} />
          <Route path='/restaurants/:restaurantId' element={<RestaurantMenuPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/fake-payment" element={<FakePayment amount={5000} />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route
            path='/partner/dashboard'
            element={
              <PartnerRoutes> <Dashboard /> </PartnerRoutes>
            }
          />
        </ Routes>


      </main>

      {renderFooter()}

      <BackToTop />

      <ToastContainer position="top-right" autoClose={3000} />
    </CartProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </BrowserRouter>
  );
}
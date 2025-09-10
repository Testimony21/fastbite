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
// import Counter from '../../frontend/src/components/Counter/CorporateCounter';
// import GetStarted from './pages/Corporate/CorporateGetStarted/CorporateGetStarted';
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
import BecomeACourier from './pages/BecomeACourier/BecomeACourier';
// import BecomeWhyDeliver from './pages/BecomeACourier/BecomeACourier';
import BecomeRequirements from './pages/BecomeACourier/BecomeRequirements/BecomeRequirements';
import BecomeQuestions from './pages/BecomeACourier/BecomeQuestions/BecomeQuestions';
import UploadForm from './pages/Partner/UploadForm/UploadForm';
import Dashboard from "./pages/Dashboard/Dashboard";
import RestaurantsPage from './pages/RestaurantsPage/RestaurantsPage';


function AppContent() {
  const location = useLocation();

  // Pages with NO footer
  const noFooterRoutes = ["/login", "/forgot-password", "/signup", "/become-a-courier", "/restaurants-page"];

  const partnerRoutes = ["/partner-with-us"];

  const partnerFooterRoutes = ["/corporate-ordering"];

  const renderNavbar = () => {
    if (location.pathname === "/login" || location.pathname === "/forgot-password" || location.pathname === "/signup" || location.pathname === "/partner/dashboard" || location.pathname === "/restaurantsPage/restaurantsPage") {
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
    <>
      {renderNavbar()}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/partner-with-us" element={<PartnerLayout />}>
          <Route index element={<PartnerWithUs />} />
          
        </Route>
        <Route path="/partner/dashboard" element={<Dashboard />} />

        <Route path="/become-a-courier" element={<BecomeACourier />} />

        <Route path="/login" element={<PartnerAuth />} />
        <Route path="/forgot-password" element={<PartnerForgotPassword />} />
        <Route path="/signup" element={<PartnerAuth />} />
        <Route path='/uploadform' element={<UploadForm />} />
        <Route path='/restaurants'  element={<RestaurantsPage />} />
      </Routes>

      {renderFooter()}

      <BackToTop />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
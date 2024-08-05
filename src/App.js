import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation, useNavigationType } from 'react-router-dom';
import Home from './components/Home';
import AcademyList from './components/AcademyList';
import SlotSelection from './components/SlotSelection';
import BookingForm from './components/BookingForm';
import CheckoutPage from './components/CheckoutPage';
import CheckOutGuest from './components/CheckOutGuest';
import Login from './components/Login';
import PersonalSignUp from './components/PersonalSignUp';
import BusinessSignUp from './components/BusinessSignUp';
import PersonalSignIn from './components/PersonalSignIn';
import BusinessSignIn from './components/BusinessSignIn';
import ParentsPage from './components/ParentsPage';
import BusinessPage from './components/BusinessesPage';
import ScrollToTop from './components/ScrollToTOp';
import AttendeeCard from './components/AttendeeCard';
import ChatbotPage from './components/ChatbotPage';
import AdminSignIn from './components/AdminSignIn';
import Dashboard from './components/dashboard';
import EventDetails from './components/EventDetails';


// Add any other paths from your secondary navbar here
const secondaryNavPaths = ['/shops', '/parents', '/providers', '/about'];

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType === 'POP' && secondaryNavPaths.includes(location.pathname)) {
      navigate('/', { replace: true });
    }
  }, [navigate, location, navigationType]);

  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/academy-list" element={<AcademyList />} />
        <Route path="/slot-selection" element={<SlotSelection />} />
        <Route path="/bookingform" element={<BookingForm />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkoutguest" element={<CheckOutGuest />} />
        <Route path="/profile" element={<Login />} />
        <Route path="/personal-signup" element={<PersonalSignUp />} />
        <Route path="/business-signup" element={<BusinessSignUp />} />
        <Route path="/personal-signin" element={<PersonalSignIn />} /> {/* Personal sign-in route */}
        <Route path="/business-signin" element={<BusinessSignIn />} />
        <Route path="/admin-signin" element={<AdminSignIn />} />
        <Route path="/parents" element={<ParentsPage />} />
        <Route path="/providers" element={<BusinessPage />} />
        <Route path="/attendeecard" element={<AttendeeCard />} />
        <Route path="/chatbotpage" element={<ChatbotPage />} />      
        <Route path="/dashboard" element={<Dashboard />} />  
        <Route path="/event-details" element={<EventDetails />} />

      </Routes>
    </ScrollToTop>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
// import PrivateRoutes from './utils/PrivateRoutes';
import BrowsePage from './pages/BrowsePage';
import WatchPage from './pages/WatchPage';
import PlansPage from './pages/PlansPage';


// here we utilize the react router dom imports to be able to route to our pages

export default function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/about" element={ <AboutPage /> } />
        <Route path="/contact" element={ <ContactPage /> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/sign-up" element={ <SignUpPage /> } />        
        {/* <Route path="/plans" element={<PrivateRoutes />}> */}
          <Route path="/plans" element={<PlansPage />} />
        {/* </Route> */}
        {/* <Route path="/browse" element={<PrivateRoutes />}> */}
          <Route path="/browse" element={ <BrowsePage /> } />
          <Route path="/browse/watch/:id" element={ <WatchPage /> } />
        {/* </Route>         */}
      </Routes>      
    </BrowserRouter>
  )
}


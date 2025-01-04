import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';


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
        {/* <Route path="/search" element={ <Search /> } /> */}
        {/* <Route element={<PrivateRoute />}> */}
          {/* <Route path="/dashboard" element={ <Dashboard /> } /> */}
        {/* </Route> */}
        {/* <Route element={<OnlyAdminPrivRoute />}>
          <Route path="/create-post" element={<CreatePost />}/>
          <Route path="/update-post/:postId" element={<UpdatePost />}/>
        </Route>
        <Route path="/projects" element={ <Projects /> } />
        <Route path="/post/:postSlug" element={ <PostPage /> } /> */}
      </Routes>
      {/* <Footer />  */}
    </BrowserRouter>
  )
}

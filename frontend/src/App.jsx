// Here we utilize the react router dom imports to be able to route to our pages
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";

export default function App() {
  return (
    <BrowserRouter>      
      <Header />
      <Routes>
        <Route path="/" element={ <HomePage /> } />
      </Routes>
    </BrowserRouter>
  )
}

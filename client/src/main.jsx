import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import PlansPage from "./pages/PlansPage.jsx"
import BrowsePage from "./pages/BrowsePage.jsx"
import WatchPage from "./pages/WatchPage.jsx"


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/plans" element={<PlansPage />} />
      <Route path="/browse" element={<BrowsePage />} />
      <Route path="/browse/watch/:id" element={<WatchPage />} />
    </Route>
  )
)


createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);

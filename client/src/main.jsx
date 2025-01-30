import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import BrowsePage from './pages/BrowsePage.jsx'
import { Provider } from 'react-redux'
import { store } from "./store/store.js"
import WatchPage from './pages/WatchPage.jsx'
import PlansPage from './pages/PlansPage.jsx'
import PrivateRoutes from './utils/PrivateRoutes.jsx'
import SignupPage from './pages/SignupPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/plans" element={<PrivateRoutes />}>
        <Route path="/plans" element={<PlansPage />} />
      </Route>
      <Route path="/browse" element={<PrivateRoutes />}>
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/browse/watch/:id" element={<WatchPage />} />
      </Route>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

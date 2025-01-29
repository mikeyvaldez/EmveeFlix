import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import { Provider } from 'react-redux'
import { store } from "./store/store.js"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<HomePage />} />
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)

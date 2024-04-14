import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { Provider } from 'react-redux';
import store from "./provider/store.jsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Category from './pages/Category.jsx';
import Login from './pages/Login.jsx';
import Transaction from './pages/Transaction.jsx';
import Home from './pages/Home.jsx';
import Budget from './pages/Budget.jsx';
import About from './pages/About.jsx';
import Setting from './pages/Setting.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/category",
    element: <Category/>,
  },
  {
    path: "/transaction",
    element: <Transaction/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
  {
    path: "/budget",
    element: <Budget/>,
  },
  {
    path: "/about",
    element: <About/>,
  },
  ,
  {
    path: "/setting",
    element: <Setting/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)

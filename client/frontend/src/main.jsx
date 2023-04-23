import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello World!</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/following",
        element: <Following />
      },
      {
        path: "/listing",
        element: <Listing />,
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "logout",
        element: <Logout />
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

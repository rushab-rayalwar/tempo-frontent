// third party imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// local imports
//styles -
import "./styles/global.css";
// pages / components -
import AuthLayout from './pages/Auth/AuthLayout.jsx';
import LoginForm from './pages/Auth/LoginForm.jsx';
import RegisterForm from './pages/Auth/RegisterForm.jsx';
import Session from './pages/Session/Session.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Calendar from './pages/Calendar/Calendar.jsx';

function App() {

  const router = createBrowserRouter([
    {
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <LoginForm />
        },
        {
          path: "register",
          element: <RegisterForm />
        },
        {
          path: "*",
          element: <LoginForm />
        }
      ]
    },
    {
      path: "/session",
      element: <Session />
    },
    {
      path: "/dashboard",
      element: <Dashboard/>
    },
    {
      path: "/calendar",
      element: <Calendar/>  
    }
  ]);
   
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
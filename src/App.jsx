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
    }
  ]);
   
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
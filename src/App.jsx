// third party imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// local imports
//styles -
import "./styles/global.css";
// pages / components -
import LoginPage from './pages/Auth/LoginPage.jsx';
import RegisterPage from './pages/Auth/RegisterPage.jsx';
import Session from './pages/Session/Session.jsx';

function App() {

  const router = createBrowserRouter([
    // { path:"*", element:<h1>Page Not Foxund!</h1>},
    { 
      path:"*",
      element: <LoginPage/>
    },
    {
      path: "/login",
      element: <LoginPage/>
    },
    {
      path: "/register",
      element: <RegisterPage/>
    },
    {
      path: "/session",
      element: <Session/>
    }
  ]);
   
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
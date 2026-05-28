// third party imports
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// local imports
import "./styles/global.css";
import LoginPage from './pages/Auth/LoginPage.jsx';
import RegisterPage from './pages/Auth/registerPage.jsx';

function App() {

  const router = createBrowserRouter([
    // { path:"*", element:<h1>Page Not Found!</h1>},
    { path:"*", element: <LoginPage/> },
    { path: "/login", element: <LoginPage/> },
    { path: "/register", element: <RegisterPage/> } 
  ]);
   
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
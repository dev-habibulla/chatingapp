import { useState } from 'react';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,

} from "react-router-dom";
import Registation from './pages/Registration';
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import Pactic from './pages/pactic';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';

const router = createBrowserRouter(
  createRoutesFromElements(

   <Route>
    <Route
    path="/"
    element={<Registation/>}
  />
    <Route
    path="/login"
    element={<Login/>}
  />
    <Route
    path="/pactic"
    element={<Pactic/>}
  />
    <Route
    path="/home"
    element={<Home/>}
    
  />
    <Route
    path="/forgotpassword"
    element={<ForgotPassword/>}
    
  />
   </Route>

  )
);

function App() {
  

  return (
    <>
     
    <RouterProvider router={router} />
    {/* <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/> */}

    
    </>
  
  )
}

export default App

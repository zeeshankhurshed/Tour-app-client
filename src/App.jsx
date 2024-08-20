import React from 'react'
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AddEditTour from './pages/AddEditTour';
import SingleTour from './pages/SingleTour';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';
import TagTours from './pages/TagTours';


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/tours/search" element={<Home />} />
        <Route path="/tours/tag/:tag" element={<TagTours />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/addTour" element={<PrivateRoute>< AddEditTour /></PrivateRoute> } />
        <Route path="/editTour/:id" element={<PrivateRoute><AddEditTour /></PrivateRoute> } />
        <Route path="/tour/:id" element={<SingleTour />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />

      </Route>
    )
  );
  return (
    <>
  <RouterProvider router={router}/>
  <ToastContainer position='bottom-right' theme='dark' transition={Bounce}/>
    </>
  )
}

export default App

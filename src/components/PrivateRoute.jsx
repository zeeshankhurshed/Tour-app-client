import React from 'react'
import {useSelector} from 'react-redux';
import LoadingToRedirect from './LoadingtoRedirect';


const PrivateRoute = ({children}) => {
  const {user}=useSelector((state)=>(state.user))
    return user ? children: <LoadingToRedirect/>;
}

export default PrivateRoute

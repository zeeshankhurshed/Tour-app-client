import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from 'react-redux';
import { Link,  useNavigate } from 'react-router-dom';
import { logout } from '../redux/features/userSlice.js'
import { CiSearch } from "react-icons/ci";
import { searchTours } from '../redux/features/tourSlice.js';
import * as jwtDecode from 'jwt-decode';



const Header = () => {
  const [show, setShow] = useState(false);
  const [search,setSearch]=useState('');
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const history = useHistory();
  const navigate=useNavigate();
  const token=user?.token;

  if(token){
    // const decodedtoken=decode(token);
    const decodedtoken = jwtDecode.default(token);
    if(decodedtoken.exp*1000 < new Date().getTime()){
      dispatch(logout());
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); // Redirect to home page after logout
  };

  const handleSubmit=(e)=>{
e.preventDefault();
if(search){
  dispatch(searchTours(search));
  navigate(`/tours/search?searchQuery=${search}`);
  setSearch('');
}else{
  navigate('/');
}
  }
  return (
    <div className=''>
      <div className='fixed top-0 bg-gray-300 w-full z-10'>
        <div className='max-w-6xl mx-auto my-4 flex justify-between items-center px-4'>
          <h2 className='font-bold text-2xl'>Tourpedia</h2>
          <div className='flex items-center gap-4'>
            <button
              type='button'
              className='md:hidden text-2xl'
              onClick={() => setShow(!show)}
            >
              <GiHamburgerMenu />
            </button>
            <ul className={`fixed top-[64px] md:top-0 right-0 h-full w-full bg-transparent backdrop-blur-lg text-white space-y-5 p-8 transform ${show ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:space-x-8 md:bg-transparent md:text-black md:p-0 md:h-auto md:backdrop-blur-none items-center gap-4`}>
              {show && (
                <li className='text-right md:hidden'>
                  <button
                    type='button'
                    className='text-3xl'
                    onClick={() => setShow(false)}
                  >
                    <IoMdClose />
                  </button>
                </li>
              )}
              {
                user?._id && (
                  <h5 className='text-xs text-black'>Logged:{user?.name}</h5>
                )
              }
              <li className='text-gray-500 md:font-bold mt-5 !m-0'><Link to={'/'} onClick={() => setShow(false)}>Home</Link></li>
              {user?._id && (
                <>
                  <li className='text-gray-500 md:font-bold !m-0'><Link to={'/addTour'} onClick={() => setShow(false)}>AddTour</Link></li>
                  <li className='text-gray-500 md:font-bold !m-0'><Link to={'/dashboard'} onClick={() => setShow(false)}>Dashboard</Link></li>
                  <li className='text-gray-500 md:font-bold !m-0'><button onClick={handleLogout}>Logout</button></li>
                </>
              )}
              {!user?._id && (
                <li className='text-gray-500 md:font-bold !m-0'><Link to={'/login'} onClick={() => setShow(false)}>Login</Link></li>
              )}
            </ul>
          <form onSubmit={handleSubmit} className='flex items-center relative'>
            <input className='focus:outline-none p-1 rounded-lg' type="text" placeholder='Search....' value={search} onChange={(e)=>setSearch(e.target.value)} />
            <span className='text-xl font-bold absolute right-0'><CiSearch /></span>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

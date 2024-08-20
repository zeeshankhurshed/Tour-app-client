import React from 'react';
import { ImSpinner9 } from "react-icons/im";

const Spinner = () => {
  return (
    <div className='flex justify-center items-center h-screen w-auto'>
      <ImSpinner9 className='text-3xl animate-spin' />
    </div>
  );
}

export default Spinner;

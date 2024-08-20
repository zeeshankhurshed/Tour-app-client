import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const LoadingToRedirect = () => {
    const navigate = useNavigate();
    const [count, setCount] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currCount) => {
                if (currCount <= 1) {
                    navigate('/login');
                    clearInterval(interval);
                }
                return currCount - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [navigate]);

    return (
        <div className='text-center mt-24'>
            <h5 className='text-3xl font-semibold'>Redirecting you in {count} seconds</h5>
            <Spinner/>
        </div>
    );
};

export default LoadingToRedirect;

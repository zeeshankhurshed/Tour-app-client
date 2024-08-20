import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { googleSignIn } from '../redux/features/userSlice';
// import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch();
    // const navigate=useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            console.log(result);

            const userData = {
                name: result.user.displayName,
                email: result.user.email,
                photo: result.user.photoURL,
            };

            dispatch(googleSignIn(userData));
            // navigate('/');
        } catch (error) {
            console.log('Could not login with Google', error);
        }
    };

    return (
        <div className='text-center'>
            <button 
                type='button' 
                onClick={handleGoogleClick} 
                className='bg-red-500 text-white font-bold p-2 rounded-lg w-full hover:opacity-95'
            >
                Continue with Google
            </button>
        </div>
    );
}

export default OAuth;

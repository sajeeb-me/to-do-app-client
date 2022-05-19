import React, { useEffect } from 'react';
import auth from '../../firebase.init';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLoading from '../PageLoading/PageLoading';

const Login = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (user) {
            // console.log(user);
            navigate(from, { replace: true })
        }
    }, [navigate, user, from])
    if (loading) {
        return <PageLoading />
    }
    if (error) {
        console.log(error.message);
    }

    return (
        <section className='px-4'>
            <div className="card lg:w-1/2 mx-auto shadow-lg mt-20 border">
                <div className='card-body'>
                    <h1 className='text-2xl font-semibold p-8'>Login now</h1>
                    <button onClick={() => signInWithGoogle()} className='btn btn-secondary btn-outline lg:mx-10'>Continue with Google</button>
                </div>
            </div>
        </section>
    );
};

export default Login;
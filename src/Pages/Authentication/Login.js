import React, { useEffect } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';
import Loading from '../Shared/Loading';

const Login = () => {

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
    const { register, getValues, formState: { errors }, handleSubmit } = useForm();
    const location = useLocation()
    const navigate = useNavigate()
    let from = location.state?.from?.pathname || "/";
    const email = getValues("email")
    const [token] = useToken(user || googleUser)

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(
        auth
    );

    let signInError
    useEffect(() => {
        if (token) {
            navigate(from, { replace: true });
        }

    }, [token, from, navigate])

    if (loading || googleLoading || sending) {
        return <Loading></Loading>
    }
    if (error || googleError) {
        signInError = <p className='text-red-500'><small>{error?.message || googleError?.message}</small></p>
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password)
    };

    const resetPassword = async () => {
        if (email) {
            await sendPasswordResetEmail(email)
            toast.success('Verification email sent')
        }

    }
    console.log(user);

    return (
        <div className='flex justify-center items-center mt-12'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Login</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is required"
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: "Provide a valid email"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' &&
                                    <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' &&
                                    <span className="label-text-alt text-red-500">{errors.email.message}</span>}

                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Must be 6 characters or longer"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.password?.type === 'required' &&
                                    <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' &&
                                    <span className="label-text-alt text-red-500">{errors.password.message}</span>}

                            </label>
                        </div>
                        {signInError}
                        <input className='btn w-full max-w-xs btn-primary' type="submit" value="Login" />
                    </form>
                    <p><small>New to Complain Box <Link className='text-primary' to='/signup'>Create New Account</Link></small></p>
                    <p><small>Forgot Password <button onClick={resetPassword} className='text-primary btn btn-link' >Reset Password</button></small></p>
                    <div className="divider">OR</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline">Continue with Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
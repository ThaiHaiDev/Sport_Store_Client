import './Signup.scss';
import { useForm, ValidationRule } from 'react-hook-form';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const regexPassword: ValidationRule<RegExp> = /^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.]).*$/;
const Signup = () => {
    const { register, reset, watch, handleSubmit, formState: { errors } } = useForm();
    const [userInfo, setUserInfo] = useState();
    const onSubmit = (data: any) => {
        setUserInfo(data);
        console.log(data);
        reset();
    };

    return (
        <div className="sign-up__page">
            <div className="container__sign-up">
                <div className="form-container__sign-up sign-up-container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2>Create An Account</h2>
                        <label> 
                            <p>{errors.firstname ? '' : 'First Name'}</p>
                            <input
                                className="signup__form-input"
                                placeholder="Enter First Name"
                                {...register('firstname', {
                                    required: 'First name is required',
                                    maxLength: {
                                        value: 10,
                                        message: 'Firstname must be less than 10 characters',
                                    },
                                })}
                            />
                            <span className="message_error">{`${errors.firstname ? errors.firstname?.message : ''}`}</span>
                        </label>

                        <label> 
                            <p>{errors.lastname ? '' : 'Last Name'}</p>
                            <input
                                className="signup__form-input"
                                placeholder="Enter Last Name"
                                {...register('lastname', {
                                    required: 'Last name is required',
                                    maxLength: {
                                        value: 10,
                                        message: 'Lastname must be less than 10 characters',
                                    },
                                })}
                            />
                            {errors.lastname && (
                                <span className="message_error">{`${
                                    errors.lastname && errors.lastname?.message
                                }`}</span>
                            )}
                        </label>

                        <label>
                            <p>{errors.email ? '' : 'Email'}</p>
                            <input
                                className="signup__form-input"
                                placeholder="Enter email"
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'This is not a valid email',
                                    },
                                })}
                            />
                            {errors.email && (
                                <span className="message_error">{`${errors.email && errors.email?.message}`}</span>
                            )}
                        </label>

                        <label>
                            <p>{errors.password ? '' : 'Password'}</p>
                            <input
                                className="signup__form-input"
                                type="password"
                                placeholder="Enter password"
                                {...register('password', {
                                    required: 'Password is required',
                                    pattern: {
                                        value: regexPassword,
                                        message:
                                            'Password must be contains at least one uppercase letter, one lowercase letter and one special character.',
                                    },
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters',
                                    },
                                    maxLength: {
                                        value: 16,
                                        message: 'Password must be less than 16 characters',
                                    },
                                })}
                            />
                            {errors.password && (
                                <span className="message_error">{`${
                                    errors.password && errors.password?.message
                                }`}</span>
                            )}
                        </label>
                        <label>
                            <p>{errors.password_confirmation ? '' : 'Confirm password'}</p>
                            <input
                                className="signup__form-input"
                                type="password"
                                placeholder="Confirm password"
                                {...register('password_confirmation', {
                                    required: 'Confirm password is required',
                                    validate: (val: string) => {
                                        if (watch('password') !== val) {
                                            return 'Your password do no match';
                                        }
                                    },
                                })}
                            />
                            {errors.password_confirmation && (
                                <span className="message_error">{`${
                                    errors.password_confirmation && errors.password_confirmation?.message
                                }`}</span>
                            )}
                        </label>
                        <button type="submit">Sign Up</button>
                    </form>
                    <div className="link__signin">
                        <p>You already an account ?<Link to='/signin' className='link'>Sign in</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;

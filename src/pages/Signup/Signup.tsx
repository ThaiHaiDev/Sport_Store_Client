import './Signup.scss';
import { useForm, ValidationRule } from 'react-hook-form';
import { useState } from 'react';

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
                            {errors.firstname && (
                                <span className="message_error">{`${
                                    errors.firstname && errors.firstname?.message
                                }`}</span>
                            )}
                        </label>

                        <label>
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
                            <input
                                className="signup__form-input"
                                type="email"
                                placeholder="Enter email"
                                {...register('email', {
                                    required: 'Email is required',
                                    minLength: 6,
                                    maxLength: 50,
                                })}
                            />
                            {errors.email && (
                                <span className="message_error">{`${errors.email && errors.email?.message}`}</span>
                            )}
                        </label>

                        <label>
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
                        <label>
                            <input type="checkbox" />
                            <span className="message_error"></span>
                        </label>

                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;

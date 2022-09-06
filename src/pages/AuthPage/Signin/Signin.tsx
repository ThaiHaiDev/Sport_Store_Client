import './Signin.scss';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import userSlice from '../userSlice';
import { SignInData } from '../../../share/models/auth';
import authApi from '../../../services/authApi';


const Signin = () => {
    const { register, reset, handleSubmit, formState: { errors }} = useForm<SignInData>();
    const dispatch = useDispatch();
    const onSubmit = async (data: SignInData) => {
        try {
            await authApi.signIn(data).then((userData) => {
                dispatch(userSlice.actions.login(userData.data))
                reset();
                document.location = '/';
            })
        } catch (error) {
            console.log(error)
        }
        
    };
    return (
        <div className="sign-in__page">
            <div className="container__sign-in">
                <div className="form-container__sign-in sign-in-container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <Link to="#" className="socialg">
                                <img src="https://img.icons8.com/color/344/google-logo.png" alt="go_icon" />
                            </Link>
                            <Link to="#" className="social">
                                <img src="https://img.icons8.com/fluency/344/facebook-new.png" alt="fa_icon" />
                            </Link>
                            <Link to="#" className="social">
                                <img src="https://img.icons8.com/ios-glyphs/344/github.png" alt="gi_icon" />
                            </Link>
                        </div>
                        <span>or use your account</span>
                        <label>
                            <input
                                type="email"
                                placeholder="Email"
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
                            <input
                                className="signup__form-input"
                                type="password"
                                placeholder="Enter password"
                                {...register('password', {
                                    required: 'Password is required',
                                    // minLength: {
                                    //     value: 8,
                                    //     message: 'Password must be at least 8 characters',
                                    // },
                                    maxLength: {
                                        value: 16,
                                        message: 'Password must be less than 16 characters',
                                    },
                                })}
                            />
                            {errors.password && <span className="message_error">{`${errors.password?.message}`}</span>}
                        </label>
                        <button type="submit">Sign In</button>
                        <p>Forgot your password?</p>
                    </form>
                </div>
                <div className="link__signup">
                        <p>Don't have an account ?<Link to='/signup' className='link'>Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signin;

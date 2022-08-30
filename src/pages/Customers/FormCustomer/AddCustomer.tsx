import { ChangeEvent, FormEvent, useState } from 'react';
import userApi from '../../../services/userApi';
import './AddCustomer.scss';
import { AxiosError } from 'axios';
import { AddUserErrorResponse } from '../../../share/models/user';

const AddCustomer = () => {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [role, setRole] = useState<string | undefined | number>('customer');
    
    const changeCategoryHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setRole(event.currentTarget?.value);
    };

    const firstChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.currentTarget?.value);
    };

    const lastChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.currentTarget?.value);
    };

    const emailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget?.value);
    };

    const phoneChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setPhone(event.currentTarget?.value);
    };

    const addressChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAddress(event.currentTarget?.value);
    };

    // Submit 
    const submitFormHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const dataUserNew = {
            firstName,
            lastName,
            password: '123',
            email,
            phone, 
            address,
            isAdmin: role
        }
        userApi.addUser(dataUserNew)
            .then((data) => {
                alert('Add success')
            })
            .catch((error: AxiosError<AddUserErrorResponse>) => {
                console.log(error)
                alert(error.response?.data?.message)
            })
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card__body">
                        <p className="tittle__add">Please enter full user information</p> <br /> <hr /> <br /> <br />
                        <form onSubmit={submitFormHandler}>
                            <input
                                className="input_add-user"
                                type="text"
                                id="first"
                                // value='test'
                                placeholder="First name"
                                autoFocus
                                onChange={firstChangeHandler}
                                required
                                // ref={props.titleRef}
                            />
                            <input
                                className="input_add-user"
                                type="text"
                                id="last"
                                // value='test'
                                placeholder="Last name"
                                autoFocus
                                onChange={lastChangeHandler}
                                required
                                // ref={props.titleRef}
                            />
                            <input
                                className="input_add-user"
                                type="text"
                                id="email"
                                // value='test'
                                placeholder="Email name"
                                autoFocus
                                onChange={emailChangeHandler}
                                required
                                // ref={props.titleRef}
                            />
                            <input
                                className="input_add-user"
                                type="text"
                                id="phone"
                                // value='test'
                                placeholder="Phone"
                                autoFocus
                                onChange={phoneChangeHandler}
                                required
                                // ref={props.titleRef}
                            />
                            <input
                                className="input_add-user"
                                type="text"
                                id="address"
                                // value='test'
                                placeholder="Address"
                                autoFocus
                                onChange={addressChangeHandler}
                                required
                                // ref={props.titleRef}
                            />
                            <label className="select__role">Role</label>
                            <select name="role" className="select" onChange={changeCategoryHandler}>
                                <option value="customer">Customer</option>
                                <option value="manager">Manager</option>
                            </select>
                            
                            <br />
                            <button className='btn-save' type="submit">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCustomer;

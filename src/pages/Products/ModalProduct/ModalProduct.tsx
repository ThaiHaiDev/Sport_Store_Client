import './ModalProduct.scss';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/usersContext';
import { AxiosError } from 'axios';
import { AddUserRequest, UpdateUserErrorResponse } from '../../../share/models/user';
import userApi from '../../../services/userApi';
import { useNavigate } from 'react-router-dom';

interface ModalProductUserProps {
    open: boolean;
    onClick: () => void;
    dataUpdate: any;
}

const ModalProduct = (props: ModalProductUserProps) => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [role, setRole] = useState<string>('customer');
    const navigate = useNavigate();
    const userContext = useContext(UserContext);

    useEffect(() => {
        setFirstName(props.dataUpdate.firstName);
        setLastName(props.dataUpdate.lastName);
        setEmail(props.dataUpdate.email);
        setPhone(props.dataUpdate.phone);
        setAddress(props.dataUpdate.address);
        setRole(props.dataUpdate.isAdmin);
    }, [props.dataUpdate]);

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

    const Update = (key:any, data:any) => {
        if(userContext?.userList.length) {
            for (var i = 0; i < userContext?.userList.length; i++) {
                if (userContext?.userList[i]._id === key) {
                    // Delete user cũ
                    userContext?.setUserList(
                        userContext?.userList.filter((user:any) => {
                            return user._id !== key;
                        }),
                    )
    
                    // Add user new update
                    userContext?.setUserList([data, ...userContext.userList])
                    break;
                }
            }
        }
    }


    // Submit
    const submitFormHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const resetForm = event.target as HTMLFormElement;
        const dataUserNew : AddUserRequest = {
            firstName,
            lastName,
            password: '123',
            email,
            phone,
            address,
            isAdmin: role,
        };

        userApi
            .updateUser(dataUserNew, props?.dataUpdate._id)
            .then(() => {
                resetForm.reset();
                Update(props?.dataUpdate._id, dataUserNew)
                alert('Update success');
                navigate('/')
            })
            .catch((error: AxiosError<UpdateUserErrorResponse>) => {
                alert(error.response?.data);
            });
    };

    return (
        <div className={`ModalProduct ${props.open ? 'open' : ''}`}>
            <div className="ModalProduct-container">
                <div className="ModalProduct-close" onClick={() => props.onClick()}>
                    <i className="ti-close">x</i>
                </div>

                <header className="ModalProduct-header">
                    <i className="ti-bag" style={{ paddingRight: '10px' }}></i>
                    Update
                </header>

                <div className="ModalProduct-body">
                    <form onSubmit={submitFormHandler}>
                        <label className="ModalProduct-label">First name</label>
                        <input
                            className="ModalProduct-input"
                            type="text"
                            id="first"
                            value={firstName}
                            placeholder="First name"
                            autoFocus
                            onChange={firstChangeHandler}
                            required
                        />

                        <label className="ModalProduct-label">Last name</label>
                        <input
                            className="ModalProduct-input"
                            type="text"
                            id="last"
                            value={lastName}
                            placeholder="Last name"
                            onChange={lastChangeHandler}
                            required
                        />

                        <label className="ModalProduct-label">Email</label>
                        <input
                            className="ModalProduct-input_email"
                            type="text"
                            id="email"
                            value={email}
                            placeholder="Email name"
                            onChange={emailChangeHandler}
                            required
                            disabled={true}
                        />

                        <label className="ModalProduct-label">Phone</label>
                        <input
                            className="ModalProduct-input"
                            type="text"
                            id="phone"
                            value={phone}
                            placeholder="Phone"
                            onChange={phoneChangeHandler}
                            required
                        />

                        <label className="ModalProduct-label">Address</label>
                        <input
                            className="ModalProduct-input"
                            type="text"
                            id="address"
                            value={address}
                            placeholder="Address"
                            onChange={addressChangeHandler}
                            required
                        />

                        <div className='role__choose'>
                            <label className="ModalProduct-label">Role: </label>
                            <select name="role" className="select" onChange={changeCategoryHandler}>
                                <option value={role}>{role}</option>
                                {role === 'manager' ? <option value="customer">customer</option> : <option value="manager">manager</option>}
                            </select>
                        </div>

                        <button className="pay-btn" type="submit">
                            PAY
                        </button>
                    </form>
                </div>

                <div className="ModalProduct-footer">
                    <div className="content-footer">
                        {/* <p>
                            Need <a href="">help?</a>
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalProduct;

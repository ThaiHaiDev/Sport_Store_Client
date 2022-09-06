import './Modal.scss';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/usersContext';
import { AxiosError } from 'axios';
import { UpdateUserErrorResponse } from '../../../share/models/user';
import userApi from '../../../services/userApi';
import { useNavigate } from 'react-router-dom';

interface ModalUserProps {
    open: boolean;
    onClick: () => void;
    dataUpdate: any;
}

const Modal = (props: ModalUserProps) => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [role, setRole] = useState<string | undefined | number>('customer');
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


    // Submit
    const submitFormHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const resetForm = event.target as HTMLFormElement;
        const dataUserNew = {
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
        <div className={`modal ${props.open ? 'open' : ''}`}>
            <div className="modal-container">
                <div className="modal-close" onClick={() => props.onClick()}>
                    <i className="ti-close">x</i>
                </div>

                <header className="modal-header">
                    <i className="ti-bag" style={{ paddingRight: '10px' }}></i>
                    Update
                </header>

                <div className="modal-body">
                    <form onSubmit={submitFormHandler}>
                        <label className="modal-label">First name</label>
                        <input
                            className="modal-input"
                            type="text"
                            id="first"
                            value={firstName}
                            placeholder="First name"
                            autoFocus
                            onChange={firstChangeHandler}
                            required
                        />

                        <label className="modal-label">Last name</label>
                        <input
                            className="modal-input"
                            type="text"
                            id="last"
                            value={lastName}
                            placeholder="Last name"
                            onChange={lastChangeHandler}
                            required
                        />

                        <label className="modal-label">Email</label>
                        <input
                            className="modal-input_email"
                            type="text"
                            id="email"
                            value={email}
                            placeholder="Email name"
                            onChange={emailChangeHandler}
                            required
                            disabled={true}
                        />

                        <label className="modal-label">Phone</label>
                        <input
                            className="modal-input"
                            type="text"
                            id="phone"
                            value={phone}
                            placeholder="Phone"
                            onChange={phoneChangeHandler}
                            required
                        />

                        <label className="modal-label">Address</label>
                        <input
                            className="modal-input"
                            type="text"
                            id="address"
                            value={address}
                            placeholder="Address"
                            onChange={addressChangeHandler}
                            required
                        />

                        <div className='role__choose'>
                            <label className="modal-label">Role: </label>
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

                <div className="modal-footer">
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

export default Modal;

import React, { useEffect } from 'react'
import { GetCurrentUser } from '../apicalls/users'
import { Avatar, Badge, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { SetLoader } from "../redux/loaderslice";
import { SetUser } from '../redux/userslice';
import { useNavigate } from 'react-router-dom';
import { ReadAllNotifications, GetAllNotifications } from '../apicalls/notification';
import Notifications from './Notifications';



function ProtectedPage({ children }) {

    const [notifications = [], setNotifications] = React.useState([]);
    const [showNotifications, setShowNotifications] = React.useState(false);
    const { user } = useSelector((state) => state.users)
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const validateToken = async () => {

        try {
            dispatch(SetLoader(true));
            const responce = await GetCurrentUser();
            dispatch(SetLoader(false));
            if (responce.success) {
                dispatch(SetUser(responce.data))

            } else {
                message.error(responce.message)
                localStorage.removeItem("token");
                navigate("/login")
            }

        } catch (error) {
            message.error(error.message)
            navigate("/login")
        }

    }

    const getNotifications = async () => {
        try {
            const response = await GetAllNotifications();

            if (response.success) {
                setNotifications(response.data);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    const readNotifications = async () => {
        try {
            const response = await ReadAllNotifications();
            if (response.success) {
                getNotifications();
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
        }
    };

    useEffect(() => {

        if (localStorage.getItem('token')) {
            validateToken();
            getNotifications();
        } else {
            navigate("/login")
        }

    }, []);



    return (
        <>
            {user && (

                <div>


                    <div className='flex justify-between items-center bg-primary p-5'>

                        <h1 className='text-2xl text-white cursor-pointer' onClick={() => { navigate("/") }}>

                            Pitch Market
                        </h1>

                        <div className='bg-white py-2 px-5 rounded flex gap-3 items-center'>
                            <i className="ri-shield-user-fill"></i>
                            <span className='underline cursor-pointer uppercase'
                                onClick={() => {

                                    if (user.role === 'user') {
                                        navigate("/profile")
                                    } else {
                                        navigate("/admin")
                                    }
                                }}>
                                {user.name}
                            </span>


                            <Badge
                                count={notifications?.filter((notification) => !notification.read).length
                                }
                                onClick={() => {
                                    readNotifications();
                                    setShowNotifications(true);
                                }}
                                className="cursor-pointer"
                            >
                                <Avatar
                                    shape="circle"
                                    icon={<i className="ri-notification-3-line"></i>}
                                />
                            </Badge>


                            <i className="ri-logout-circle-r-line ml-10"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    message.success("Logout successful");
                                    navigate("/login")
                                }}
                            ></i>


                        </div>


                    </div>


                    <div className='p-5'> {children}</div>

                    {
                        <Notifications
                            notifications={notifications}
                            reloadNotifications={getNotifications}
                            showNotifications={showNotifications}
                            setShowNotifications={setShowNotifications}
                        />
                    }
                </div>
            )}
        </>
    )
}

export default ProtectedPage
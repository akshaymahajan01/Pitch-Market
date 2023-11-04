import React, { useEffect } from 'react'
import { Button, Form, Input , message} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../../apicalls/users'
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../redux/loaderslice';



const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async(values) => {
    try {
      dispatch(SetLoader(true));
      const responce = await LoginUser(values)
      dispatch(SetLoader(false));
      if (responce.success) {
        localStorage.setItem("token" , responce.data);
        message.success(responce.message)
        navigate("/");
      } else {
        throw new Error(responce.message)
      }
    } catch (error) {
      message.error(error.message)
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  },[]);


  return (
    <div className='h-screen bg-primary flex justify-center items-center'>
      <div className='bg-white p-5 rounded w-[450px]'>

        <h1 className='text-primary text-2xl mb-3'>
            Pitch Market <span className='text-gray-400'> - Login</span>
        </h1>

        <Form layout='vertical'
          onFinish={onFinish}
        >

          <Form.Item label='Email' name='email'  rules={[{ required: true, message: 'email is required' }]}>
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item label='Password' name='password'  rules={[{ required: true, message: 'password is required' }]}>
            <Input
              type="password"
              placeholder='Password' />
          </Form.Item>

          <Button type='primary' htmlType="submit"
            block
          >                                              
            Login
          </Button>

          <div className='mt-5 text-center'>
            <span>
              Don't have an account? <Link to="/register">Register</Link>
            </span>
          </div>

        </Form>

      </div>
    </div>
  )
}

export default Login
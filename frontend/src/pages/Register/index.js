import React, { useEffect } from 'react'
import { Button, Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser } from '../../apicalls/users'
import { useDispatch } from 'react-redux';
import { SetLoader } from '../../redux/loaderslice';



const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const responce = await RegisterUser(values)
      dispatch(SetLoader(false));
      if (responce.success) {
        message.success(responce.message)
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
            Pitch Market <span className='text-gray-400'> - Register</span>
        </h1>

        <Form layout='vertical'
          onFinish={onFinish}
        >

          <Form.Item label='Name' name="name" rules={[{ required: true, message: 'Username is required' }]}>
            <Input placeholder='Name' />
          </Form.Item>

          <Form.Item label='Email' name='email' rules={[{ required: true, message: 'email is required' }]}>
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item label='Password' name='password' rules={[{ required: true, message: 'password is required' }]}>
            <Input
              type="password"
              placeholder='Password' />
          </Form.Item>

          <Button type='primary' htmlType="submit"
            block
          >
            Register
          </Button>

          <div className='mt-5 text-center'>
            <span>
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </div>

        </Form>

      </div>
    </div>
  )
}

export default Register
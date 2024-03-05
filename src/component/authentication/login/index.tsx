'use client'

import { Alert, Button, Heading, Pane, Text, TextInputField } from 'evergreen-ui'
import React, { useEffect, useState } from 'react'
import style from '../signup/signup.module.css'
import Link from 'next/link'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CreateUser } from '@/src/@core/types'
import { login} from '@/src/@core/redux/feautures/authSlice'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'


const Login = () => {

  const [responseMessage, setResponseMessage] = useState("")
  const [responseIntent, setResponseIntent] = useState<"success" | "danger">("success"); // Default to success

  const loginSchema = Yup.object().shape({
    emailAddress: Yup.string()
      .email()
      .required('Email is required')
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        'Invalid email address',
      ),
    password: Yup.string()
      .min(8, 'Password must be 8 characters long')
      .required('Password is required'),
  })

  const dispatch = useDispatch();
  const navigate = useRouter();
  
  const [user, setUser] = useState<CreateUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);



   const formik = useFormik<CreateUser>({
    initialValues: {
      emailAddress: '',
      password: '',
    },
    validationSchema: loginSchema,
     validateOnBlur: true,
    
  onSubmit: (values: CreateUser) => {
    if (user) {
      if (user.emailAddress === values.emailAddress && user.password === values.password) {
        dispatch(login(user));
        setResponseMessage("Login successful");
        setResponseIntent("success");
        navigate.push(`/`);
        console.log('Login successful');
      } else {
        console.log('Invalid username or password');
        setResponseMessage("Invalid username or password");
        setResponseIntent("danger");
      }
    } else {
      setResponseMessage('User does not exist');
    }
  }
 
  });
  return (
    <div className={style['container']}>
      <Pane className={style['wrapper']}>
                {responseMessage && <Alert intent={responseIntent}>{responseMessage}</Alert>}

        <Pane className={style['logo']}>
          <Text className={style['harun']}>Harun</Text>
          <Text className={style['cloth']}>Cloth</Text>
        </Pane>
        <Heading className={style['heading']}>Log in to your account</Heading>

        <form onSubmit={formik.handleSubmit}>
          <TextInputField
            label="Email Address"
            id="emailAddress"
            type="emailAddress"
            className={style['form-control']}
             name="emailAddress"
            value={formik.values.emailAddress}
            onChange={formik.handleChange}
            validationMessage={formik.errors.emailAddress}
          />
          <TextInputField
            type="password"
            label="Password"
            id="password"
            className={style['form-control']}
                name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            validationMessage={formik.errors.password}
          />

          <Button className={style['form-btn']}>Login</Button>
        </form>

        <Pane>
          <Text className={style['oralt']}>
            Don&apos;t have an account?
            <Link href="/authentication/signup" className={style['auth-link']}>
              Sign up
            </Link>
          </Text>
        </Pane>
      </Pane>
    </div>
  )
}

export default Login

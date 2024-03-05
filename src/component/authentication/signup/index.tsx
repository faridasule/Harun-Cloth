'use client'

import { Alert, Button, Heading, Pane, Text, TextInputField } from 'evergreen-ui'
import React, { useState } from 'react'
import style from './signup.module.css'
import Link from 'next/link'
import { CreateUser } from '@/src/@core/types'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { failed, register} from '@/src/@core/redux/feautures/authSlice'
import { useRouter } from 'next/navigation'

const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useRouter();
    const [responseMessage, setResponseMessage] = useState("")
  const [responseIntent, setResponseIntent] = useState<"success" | "danger">("success"); // Default to success



  const signupSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name is required'),
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

  const initialValues: CreateUser = {
    fullName: '',
    emailAddress: '',
    password: '',
  }

  const formik = useFormik<CreateUser>({
    initialValues: initialValues,
    validationSchema: signupSchema,
    validateOnBlur: true,
    onSubmit: (values) => {

        try {
          dispatch(register(values));
           setResponseMessage("Registration successful")
          setResponseIntent("success");
           navigate.push(`/`)

          console.log(values, 'val')
      } catch (error) {
          dispatch(failed('Failed')); 
           setResponseMessage("Registration failed")
          setResponseIntent("danger");
      }
    },

    
  })

  return (
    <div className={style['container']}>
      <Pane className={style['wrapper']}>
        {responseMessage && <Alert intent={responseIntent}>{responseMessage}</Alert>}

        <Pane className={style['logo']}>
          <Text className={style['harun']}>Harun</Text>
          <Text className={style['cloth']}>Cloth</Text>
        </Pane>
        <Heading className={style['heading']}>Create an account</Heading>

        <form onSubmit={formik.handleSubmit}>
          <TextInputField
            label="Full Name"
            id="fullName"
            className={style['form-control']}
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            validationMessage={formik.errors.fullName}
          />
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

          <Button className={style['form-btn']}>Sign up</Button>
        </form>

        <Pane>
          <Text className={style['oralt']}>
            Are you a member?
            <Link href="/authentication/login" className={style['auth-link']}>
              Login
            </Link>
          </Text>
        </Pane>
      </Pane>
    </div>
  )
}

export default Signup



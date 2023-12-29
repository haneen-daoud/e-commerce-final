import { useFormik } from 'formik'
import React from 'react'
import Input from '../../pages/Input'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Send() {
  const initialValues = {
    email: '',
  }
  const navigate = useNavigate();

  const onSubmit = async (users) => {
    const email = users.email
    try {
      const { data } = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,
        { email })
      if (data.message == 'success') {
        toast.success('Code sent successfully', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });


        navigate('/forget');
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    sendCode,
  });

  return (
    <div className="container">
      <h1>Enter email to sendCode</h1>
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <Input
          type="email"
          id="email"
          name="email"
          title="User Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          touched={formik.touched}
          errors={formik.errors}
        />
        <button type="submit" disabled={!formik.isValid}>
          Send Code
        </button>
        <Link to="/login" className="text-decoration-none">
          Back to Login
        </Link>
      </form>
    </div>)
}

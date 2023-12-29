import React from 'react'
import { useFormik } from 'formik';
import Input from '../../pages/Input';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import {  Link, useNavigate } from 'react-router-dom';


export default function Forget() {
const navigate=useNavigate()

    const initialValues= {
        code:'',
        password:'',
        email:'',
    };

    const onSubmit = async (users) => {

         const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,
         users
         );
         if (data.message == 'success'){
            toast.success('Password reset successfully', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                navigate('/home')
         }

    }
    const formik = useFormik ({
        initialValues,
        onSubmit,
        forgetPassword,
      
    });

    const inputs = [

        
        {
            id:'email',
            type:'email',
            name:'email',
            title:'user email',
            value:formik.values.email,
        },
        {
            id: 'code',
            type: 'text',
            name: 'code',
            title: 'Enter Code',
            value: formik.values.code,
          },
          {
            id: 'password',
            type: 'password',
            name: 'password',
            title: 'New Password',
            value: formik.values.Password,
          },
    ]

    
    const renderInputs = inputs.map ((input,index)=>
    <Input type={input.type}
           id={input.id}
           name={input.name} 
           title={input.title}
           value={input.value}  
           key={index}
           onChange={input.onChange||formik.handleChange} 
           errors={formik.errors}
           onBlur={formik.handleBlur} 
           touched={formik.touched}/>
    )
    
  return (
    
    <div className=' container'>
        <h1>Log in</h1>
        <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
        {renderInputs}
        <button type='submit' disabled={!formik.isValid}>Login</button>
        <Link to="/send" className='text-decoration-none'>forget password?</Link>
      
        </form>
    </div>

  )
}
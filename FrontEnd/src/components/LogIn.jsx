
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Login() {

  const navigate=useNavigate()

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', contactNo: '', password: '', confirm_password: '' })
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:510/user/login', formData)
    .then((res)=>{
      Cookies.set('role', res.data.userRole);
      Cookies.set('firstName', res.data.firstName)
      if(res.data.userRole=='admin'){
        navigate('/dashboard/adminDash')
      }
      else if(res.data.userRole=='student'){
        navigate('/dashboard/studentDash')
      }
      else if(res.data.userRole=='examinar'){
        navigate('/dashboard/examinarDash')
      }
      else if(res.data.userRole=='supervisor'){
        navigate('/dashboard/supervisorDash')
      }
      else if(res.data.userRole=='member'){
        navigate('/dashboard/pMemberDash')
      }
     

      toast.success(`${res.data.userRole}, successfully Logged In!`)
      console.log(res)//alert('User created successfully')
    })
    .catch((err)=>{
    console.log('Error:', err)//alert('User creation failed')
    alert(err.response.data.message)
    })
  }


  return (
    
    <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-xl mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">User Log In</h1>
                    <form onSubmit={handleSubmit} className="mb-4 md:flex md:flex-wrap md:justify-between" action="/signup/" method="post">
                   
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email"  
                        id='email'
                        onChange={handleChange}/>


                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" 
                        id='password'
                        onChange={handleChange}/>

                       
               

                    <button   
                    type="submit" className="w-full text-center  bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    Sign In
                    </button>
                    <div>
                      <p className='text-red-600 text-center'>
                  
                      </p>
                    </div>

                   

                    </form>
                </div>

                <div className="text-grey-dark mt-6 flex gap-2">
                    <p>Cannot Sign In ? </p>
                    
                    <span className="no-underline border-b border-blue text-blue-700" href="../login/">
                       Contact Administrators!
                    </span>
                </div>

                <div className="text-grey-dark mt-6 flex gap-2">
                    <Link to='/'>
                    <span className="no-underline border-b border-blue text-blue-700" href="../login/">
                       Home
                    </span>  
                    </Link> 
                </div>
            </div>
        </div>
  )
}

export default  Login;
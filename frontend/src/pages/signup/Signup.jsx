import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const SignUp = () => {

    const [input, setinputs] = useState({
        fullName: '',
        username: '',
        password: '',
        confirmPassword: '',
        gender: ''
    })

    const {loading, signUp} = useSignup()

    const handleCheckboxChange = (gender) =>{
        setinputs({...input, gender})
    }

    


    const handleSubmit = async(e) => {
        e.preventDefault();
        await signUp(input)
    }
  return (
    <div className=' flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className=' w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className=' text-3xl font-semibold text-center text-gray-300'>SignUp
                    <span className=' text-blue-500'> ChatApp</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className=' label p-2'>
                            <span className=' text-base label-text'>FullName</span>
                        </label>
                        <input type="text" placeholder='FullName' className=' input input-bordered w-full h-10'
                        value={input.fullName} onChange={(e)=> setinputs({...input, fullName: e.target.value})} />
                    </div>

                    <div>
                    <label className=' label p-2'>
                            <span className=' text-base label-text'>Username</span>
                        </label>
                        <input type="text" placeholder='userName' className=' input input-bordered w-full h-10' 
                        value={input.username} onChange={(e)=> setinputs({...input, username: e.target.value})}/>

                    </div>

                    <div>
                    <label className=' label p-2'>
                            <span className=' text-base label-text'>Password</span>
                        </label>
                        <input type="password" placeholder='Password' className=' input input-bordered w-full h-10'
                        value={input.password} onChange={(e)=> setinputs({...input, password: e.target.value})} />

                    </div>
                    <div>
                    <label className=' label p-2'>
                            <span className=' text-base label-text'>Confirm Password</span>
                        </label>
                        <input type="password" placeholder='Confirm Password' className=' input input-bordered w-full h-10'
                        value={input.confirmPassword} onChange={(e)=> setinputs({...input, confirmPassword: e.target.value})} />

                    </div>

                    <GenderCheckBox onCheckboxChange= {handleCheckboxChange} selectGender = {input.gender}/>


                    <Link to='/login' className=' text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
                        Already have an account?
                    </Link>

                    <div>
                    <button className=' btn btn-block btn-sm mt-2'>Signup</button>
                    </div>


                </form>

        </div>
    </div>
  )
}

export default SignUp
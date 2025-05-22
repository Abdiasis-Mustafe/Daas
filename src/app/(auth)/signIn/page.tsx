'use client'

import { loginFN, resetLogin } from '@/redux/slice/LoginSlice'
import { Appdispatch, RootState } from '@/redux/store'
import { useRouter } from 'next/navigation'
import { userInfo } from 'os'
// import { RootState } from '@/redux/store'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

// import {RootState} from '../../../redux/store'

const signIn = () => {
  // const [name ,setName]=useState('')
  // const [email,setEmail]= useState('')
  // const [password,setpassword]=useState('')
  // const registerState= useSelector((state:RootState)=> state.register)
  //  const dispatch = useDispatch()
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   dispatch(registerFn({ name ,email, password }));
  // };

  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')

  

  const dispatch= useDispatch<Appdispatch>()

  const LogingState=  useSelector((state:RootState)=>state.login)
  const  router= useRouter()

  const toastId= 'sigin'

  useEffect(() => {
    const token = localStorage.getItem('userInfo')!
    if(token){
      router.push('/dashboard')
    }
  }, [])
  
  useEffect(() => {
    if(LogingState.status==='loading'){
      toast.loading('Loading please wait!', {id:toastId})
    } else if(LogingState.status==='success'){
      toast.success(`Welcome  ${LogingState.data?.user.name}`,{id:toastId})
      const UserInfo={
        user:LogingState.data?.user,
        token:LogingState.data?.token

      }
     
      localStorage.setItem('userInfo',JSON.stringify(UserInfo))
      router.push('/dashboard')
    }else if(LogingState.status==='failed'){
      toast.error(LogingState.error,{id:toastId})
    }

    dispatch(resetLogin())
  }, [LogingState.status,])
  

  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault()
  dispatch(loginFN({email,password}))
  }

  return (
    <div className='flex f w-[90%] m-auto items-center justify-center mt-30'>
        <div className='shadow-2xl shadow-cyan-800 rounded-2xl p-5 w-[100%] flex justify-between'>

            <div className=' w-[50%] '>  
            <h1 className='font-semibold text-3xl text-center'>SignIn </h1>
            <p className='font-semibold text-sm text-gray-600 text-center'> welcome Back!</p>
            <form action=""    className='flex flex-col gap-4'>
          <label>Email:</label>
          <input type="email" value={email}  onChange={e=>setEmail(e.target.value)}  className=' p-4  bg-gray-100 rounded-2xl ' placeholder='Enter Your Email Address' />

          <label>Password:</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className=' p-4  bg-gray-100 rounded-2xl ' placeholder='Enter Your Password Address' />

          <button type='submit' className='bg-cyan-800 text-white  rounded-2xl p-4 mt-3'>SignIn</button>
            </form>

            </div>
            <div className=' bg-cyan-700 w-[47%] rounded-md h-[60vh]'>
      
        </div>
        </div>
        

        
        
        </div>
  )
}

export default signIn
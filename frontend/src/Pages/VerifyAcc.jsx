import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { verifyAccount } from '../api/userApi'

const VerifyAcc = () => {
    // get token from URL - {token: adhahsdafada}
    const { token } = useParams()

    let [error, setError] = useState('')
    let [success, setSuccess] = useState('')

    useEffect(()=>{
        verifyAccount(token)
        .then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                setSuccess(data.message)
            }
        })
    },[])

  return (
    <>
    {
        error &&
        <div className='h-[80vh] bg-purple-200 text-2xl text-center pt-9 text-black'>
            {error} . <Link to={'/'} className='Block text-black underline'>HOME</Link>
        </div>
    }
    {
        success &&
        <div className='h-[80vh] bg-green-200 text-2xl text-center pt-9 text-black'>
            {success} . <Link to={'/login'} className='Block text-black underline'>Login Now</Link>
        </div>}
    
    </>
  )
}

export default VerifyAcc
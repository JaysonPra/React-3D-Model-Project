import React, { useState } from 'react'
import { resetPassword } from '../api/userApi'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
    const { token } = useParams()

    let [password, setPassword] = useState('')
    let [error, setError] = useState('')
    let [success, setSuccess] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        resetPassword(token, password)
            .then(data => {
                if (data.error) {
                    setError(data.error)
                    setSuccess('')
                }
                else {
                    setError('')
                    setSuccess(data.message)
                }
            })
    }

    const showError = () => {
        if (error) {
            return <div className='bg-red-200 py-5 text-black text-center text-2xl'>{error}</div>
        }
    }
    const showSuccess = () => {
        if (success) {
            return <div className='bg-green-200 py-5 text-black text-center text-2xl'>{success}</div>
        }
    }


    return (
        <>
            <form className='w-1/2 mx-auto my-5 p-5 rounded-lg border-slate-300 border'>
                <h1 className='fw-bold text-center underline text-2xl'>RESET PASSWORD</h1>
                {showError()}
                {showSuccess()}
                <label htmlFor="pwd">New Password</label>
                <input type="text" id='pwd' className='w-full mt-2 mb-3 outline outline-slate-300 outline-2 px-4 py-2 rounded' onChange={e => setPassword(e.target.value)} />
                <button className='bg-blue-900 hover:bg-blue-500 active:bg-blue-300 text-white active:text-blue-900 px-4 py-2 w-full rounded-md' onClick={handleSubmit}>RESET Password</button>
            </form>
        </>
    )
}

export default ResetPassword
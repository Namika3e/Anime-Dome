import React from 'react'
import "./login.css"
import { useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()


  const handleSubmit = (e) => {
    e.preventDefault()

    login(email,password)
  }



  const login = async(email,password) => {
    setIsLoading(true)
    setError(null)
    const response = await fetch('http://localhost:4000/login', {
      method: "POST",
      headers : {"Content-Type" : 'application/json'},
      body: JSON.stringify({email, password})
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setIsLoading(false)
    }

    if (response.ok) {
      //save session/user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      dispatch({type: 'LOGIN', payload:json})

      setIsLoading(false)


    }
  }
  return (
    <main className='main'>
        <section className='form-section login-section'>
        <h1 className='text-3xl text-[#FBB034] font-bold'>Login <span className='text-2xl'>ログイン</span> </h1>
        <form onSubmit={handleSubmit}>
            <div className='login-email-div'>
            <label htmlFor="email">Email</label>
            <input 
            type="email" 
            name="email" 
            id="email" 
            className='border-grey border border-solid focus:outline-none'
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            />
            
            </div>

            <div className='login-password-div pt-10'>
                <label htmlFor="password">Password</label>
                <input 
                type="password" 
                name="password" 
                id="password" 
                className='border-grey border border-solid focus:outline-none'
                onChange={(e)=> setPassword(e.target.value)}
                value={password}
                />
            </div>

            <div className='flex justify-center pt-6'>
            <button className='bg-[#FBB034] px-6 py-2 rounded-md' disabled={isLoading}>Login</button>
            </div>

            {error && <div>{error}</div>}
        </form>
        </section>
    </main>
  )
}

export default Login
// import axios from 'axios'
import React, {useState} from 'react'
import { useAuthContext } from './hooks/useAuthContext'
import '../components/Login/login.css'

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch }  = useAuthContext();


  const signupFunction = async (username,email,password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:4000/signup', {
      method: "POST",
      headers: {'Content-Type' : 'application/json'}, //Type of data i'm sending
      body: JSON.stringify({username, email, password})  // turn the data to a string before saving
    })

    const json = await response.json(); //convert the data back to json format
    // console.log(json.error)

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    if (response.ok) {
      //save user to local storage
      localStorage.setItem('user', JSON.stringify(json)) // turn the data back to a string before saving to local storage(you can only save strings to local storage)

      //update auth context

      dispatch({type: 'LOGIN', payload:json})
      setUsername("")
      setEmail("")
      setPassword("")
      setIsLoading(false)
    }

  }

  const handleSubmit = (e)=> {
    e.preventDefault();

    signupFunction(username, email, password)
  }
  return (
    <main className='main'>
        <section className='form-section login-section'>
        <h1 className='text-3xl text-[#FBB034] font-bold'>SignUp <span className='text-2xl'>サインアップ</span> </h1>
        <form action="http://localhost:4000/signup" onSubmit={handleSubmit}>
        <div className='login-email-div'>
            <label htmlFor="username">Username</label>
            <input 
            type="text" 
            name="username" 
            id="username" 
            className='border-grey border border-solid focus:outline-none' 
            value={username} 
            onChange={(e)=>setUsername(e.target.value)} 
            required
            />
            <div></div>
            </div>

            <div className='login-email-div pt-7'>
            <label htmlFor="email">Email</label>
            <input 
            type="email" 
            name="email" 
            id="email" 
            className='border-grey border border-solid focus:outline-none' 
            value={email} 
            onChange={(e)=> setEmail(e.target.value)} required/>
            </div>

            <div className='login-password-div pt-10'>
                <label htmlFor="password">Password</label>
                <input 
                type="password" 
                name="password" 
                id="password" 
                className='border-grey border border-solid focus:outline-none' 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)} required/>
            </div>

            <div className='flex justify-center pt-6'>
            <button className='bg-[#FBB034] px-6 py-2 rounded-md' disabled={isLoading}> Signup</button>
            </div>
            {error && <div className='pt-4'>{error}</div>}
        </form>
        </section>
    </main>
  )
}

export default Signup
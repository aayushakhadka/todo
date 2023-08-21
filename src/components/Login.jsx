import React, { useEffect, useState } from 'react'
import { Link, resolvePath, useNavigate } from 'react-router-dom';
import {BsEyeSlash} from 'react-icons/bs'
import {BsEye} from 'react-icons/bs'
import './login.css'

export const Login = () => {

const navigate=useNavigate()

   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



const [emailError,setEmailError]=useState('')
const[passwordError,setPasswordError]=useState('')
const[passwordVisible,setPasswordVisible]=useState(false)
const[userError,setUserError]=useState('')

const[userData,setUserData]=useState({
  email:"",
  password:"",
  })

  const [listData, setListData] = useState([])




  // const [email, password ]=userData;

  
  



const getData=(event)=>{
  const name=event.target.name
  const value=event.target.value

  setUserData({...userData,[name]:value})
}

const showData= async()=>{
  
if(emailRegex.test(userData.email)){
  setEmailError('')
}
else{
setEmailError("your email is not valid")
}

if(userData.password.length>=8){
  setPasswordError("");
}

else{
setPasswordError('password does not meet minimum length')
}


try {
  const response = await fetch('http://localhost:3001/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  const resp = await response.json()

  console.log("resp", resp)


  if (!resp.error) {
    // Successful login
    navigate('/todo')
    console.log('resolvePath', 'RESPNSE')
  } 
  
  else {
    console.log(resp.error, 'error')
setUserError(resp.error)

  }
} catch (error) {
  console.error('An error occurred:', error);

}

 

}


const showPassword=()=>{

setPasswordVisible(!passwordVisible)
}





  return (
    <div>


  <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
  <div className='Container'>

<h1 className='h1'>Login</h1>

  <div className='emailContainer'>
<input type='text' className='input' value={userData.email} placeholder='email' name='email'
          onChange={getData} />



        {emailError !== '' &&
          <span className='emailError'>{emailError}</span>
        }


  </div>

<div className='passwordContainer'>

<input type= {passwordVisible   ? 'text':'password'} value={userData.password} placeholder='password' name='password'
          onChange={getData} />
          
        {passwordVisible ? <BsEyeSlash className='eye' onClick={showPassword}/> : <BsEye className='eye' onClick={showPassword}/>}



        {passwordError !== '' &&
          <span className='passwordError'>{passwordError}</span>
        }

        {userError !=='' &&
        <span className='userError'>{userError}</span>
        }

</div>

<p className='forgetpw'>Forget password?</p>

<div className='dividerContainer'>


</div>



<div className='routecontainer'>




<Link className='signup' to='/'>
<span>Create new account</span></Link>

</div>

<div>

<button className='login' onClick={showData}>Sign In</button>


</div>




  </div>
  </div>


    </div>
  )
}

import React, { useEffect, useState } from 'react'
import {BsEyeSlash} from 'react-icons/bs'
import{BsEye} from 'react-icons/bs'
import { Link, resolvePath, useNavigate, useParams } from 'react-router-dom';
import './signup.css';


export const Signup = () => {

  const navigate = useNavigate()

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



const [emailError,setEmailError]=useState('')
const[passwordError,setPasswordError]=useState('')
const[passwordVisible,setPasswordVisible]=useState(false)
const[signUpError,setSignUpError]=useState('')

const[userData,setUserData]=useState({
    email:"",
    password:"",
    })

    const [listData, setListData] = useState([])



        // const{mytodo}=useParams();

        // useEffect(() => {
        //     fetch(`https://jsonplaceholder.typicode.com/todos/${mytodo}`)
        //       .then(response => response.json())
        //       .then(json => setListData(json))
        //   }, [])

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
  const response = await fetch('http://localhost:3001/signup', {
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
    navigate('/login')
    console.log('resolvePath' ,'RESPNSE')
  } 
  
  else {
    console.log(resp.error, 'error')
setSignUpError(resp.error)

  }
} catch (error) {
  console.error('An error occurred:', error);

}

 


}


const showPassword=()=>{

  setPasswordVisible(!passwordVisible)
}





  return (


    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
    <div className='mainContainer'>

<h1 className='signup'>Sign Up</h1>

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
{signUpError !==''&&
<span className='signUperror'>{signUpError}</span>
}


</div>

<div className='routecontainer'>

<span className='span'> Already a member?</span>


<Link className='route' to='/login'>
 <span>Log In</span></Link>

</div>

<div>

<button className='submit' onClick={showData}>Sign up</button>


</div>




    </div>
    </div>
  )
        }
        

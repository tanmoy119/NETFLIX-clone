import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

const login = ({setSignin, Title}) => {
    const url = "https://netflix-api1.herokuapp.com/api/login"

    const [cookies, setCookie] = useCookies('jwt');
 
    const router =  useRouter();


  
    

    const [data,setData] = useState({
        email:"",
        password:""
      });

    const inputEvent = (e)=>{
        const {name,value} = e.target;
        setData((prevalue)=>{
           return {
            ...prevalue,
            [name]:value
          }
        });
      }

    const onSubmit = async (event)=>{
        event.preventDefault();
    
        const res = await axios({
          method: 'post',
          url: url,
          headers: {}, 
          data: {
              email: data.email,
              password: data.password
            
          }
        });

        const token = res.data.token;
        if(token){
        setCookie('jwt', token , {path:'/'});
        router.push('/home');
    }
    }
  return (
    <Cont>
    <div className="signup-s">
    <form onSubmit={onSubmit} >
      <h1>Sign In</h1>
      <input type="email" placeholder='Email' name='email' onChange={inputEvent} value={data.email} />
      <input type="password" placeholder='Password' name='password' onChange={inputEvent} value={data.password} />
      <button className='Sbtn' type='submit'>Sign In</button>
      </form>
      <h4> <span style={{color:'gray'}}>New to Netflix?</span><span  onClick={()=>setSignin(false)} className='SignupL'>Sign up now.</span></h4>
   

    </div>
    </Cont>
  )
}

export default login;

const Cont = styled.div`
.signup-s{
    // max-width: 300px;
     padding: 70px;
     margin-left: auto;
     margin-right: auto;
     background-color: rgba(0,0,0,0.65);
     border-radius: 3px;
     form{
       
       display: grid;
       flex-direction: column;

       input{
         min-width: 300px;
         outline-width: 0;
         height: 40px;
         margin-bottom : 14px;
         padding: 5px 15px;
         border-radius: 5px;
         border: none;
       }
       .Sbtn{
         padding: 16px 20px;
         font-size: 1rem;
         color #fff;
         border-radius: 5px;
         background-color: #e50914;
         font-weight: 600;
         margin-top: 20px;
         border: none;
         cursor: pointer;

       }
       
       .SignupL{
         cursor: pointer;
       }
       .SignupL:hover{
         text-decoration: underline;

       }

     }
 }
`

import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import styled from 'styled-components';

const login = ({setSignin, title, user, emaildata, setVerify}) => {
   // const url = "https://netflix-api1.herokuapp.com/api/login"
    const url = "https://netflix-api1.herokuapp.com/api/login"
    const url2 = "https://netflix-api1.herokuapp.com/api/register"
    const url3 = "https://netflix-api1.herokuapp.com/api/verify/otp"
    const url4 = "https://netflix-api1.herokuapp.com/api/otp/resend"

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
      if(title=='Sign In'){
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
    }else if(title =="Sign Up"){
     
      const res = await axios({
        method: 'post',
        url: url2,
        headers: {}, 
        data: {
            email: emaildata.email,
            password: data.password
          
        }
      });

      const token = res.data.token;
      if(token){
      setCookie('jwt', token , {path:'/'});
      setVerify(true);
      setData({
        email:"",
        otp:""
      })
    }
    }else if(title =="Verify"){
      const res = await axios({
        method: 'post',
        url: url3,
        headers: {}, 
        data: {
            email: (emaildata.email)?emaildata.email:user.email,
            otp: data.otp
          
        }
      });

      if(res.status =='200'){
      router.push('/home');                                                   
    }
    }
  }

  const resendOtp = async ()=>{
    const res = await axios({
      method: 'post',
      url: url4,
      headers: {}, 
      data: {
          email: (emaildata.email)?emaildata.email:user.email
        
      }
    });

  }
  return (
    <Cont>
    <div className="signup-s">

    {
        (title == "Verify")?<>
         <form onSubmit={onSubmit} >
      <h1>{title}</h1>
      
      <input type="email" placeholder='Email' name='email'  value={(emaildata.email)?emaildata.email:user.email} />
      <input type="string" placeholder='Otp' name='otp' onChange={inputEvent} value={data.otp} />
      <button className='Sbtn' type='submit'>Verify</button>
      </form>
      <h4> <span style={{color:'gray'}}>New to Netflix?</span><span style={{cursor:'pointer'}}  onClick={()=>resendOtp()} className='SignupL'>Resend Otp</span></h4>
        </>:<>
        <form onSubmit={onSubmit} >
      <h1>{title}</h1>
      {
        (title=='Sign Up')?<>
        <input type="email" placeholder='Email' name='email' value={emaildata.email} /></>:<>
        <input type="email" placeholder='Email' name='email' onChange={inputEvent} value={data.email} />
        </>
      }
      
      <input type="password" placeholder='Password' name='password' onChange={inputEvent} value={data.password} />
      <button className='Sbtn' type='submit'>{title}</button>
      </form>
   
      <h4> <span style={{color:'gray'}}>New to Netflix?</span><span style={{cursor:'pointer'}}  onClick={()=>setSignin(false)} className='SignupL'>{(title=="Sign In")?"Sign up now.":"Log In"}</span></h4>
      </>
    }
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

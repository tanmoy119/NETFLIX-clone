import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import  { Cookies, useCookies } from 'react-cookie';
import auth from '../middleware/Auth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Login from '../components/Login';





const index= (req,res)=> {
  const url = "https://netflix-api1.herokuapp.com/api/verify/jwt";
 
  
  const [signin,setSignin] = useState(false);
  const [cookies, setCookie] = useCookies('jwt');
 
  const router =  useRouter();

  

  

  const Cokies = new Cookies();

  const token = Cokies.get('jwt');

  // Server-render loading state

  useEffect(()=>{
    (async ()=>{ const res = await axios({
      method: 'post',
      url: url,
      headers: {}, 
      data: {
          token:token
        
      }
    });        
    


    if(res.status == 200){
      router.push("/home");
    }
  })()
  },[url]);
  

  const loginP = ()=>{
    setSignin(true);
  };

  



  


   return (
    <>
    <Container>
      <div className="screenGradient">
    <Head>
      <title>Netflix</title>
      <link rel="shortcut icon" href="https://www.themanual.com/wp-content/uploads/sites/9/2021/12/netflixlogo-0-0.jpg?p=1#038;p=1.jpg" type='image/x-icon' />
    </Head>
    <Navbar login={loginP} logint signin={signin}/>
    <div className="body">
    {
      (signin)?<>
     <Login setSignin={setSignin} title={"Sign In"}/>

      </>:<>
     
      <h1>Unlimited movies, TV shows and more.</h1>
      <h2>Watch anywhere. Cancel anytime.</h2>
      <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
      <div className="login-input">
        <form action="">
          <input type="email" placeholder='Email Adderss' required='true'   />
          <button className="Lbtn" onClick={()=>loginP()}>GET STARTED</button>
        </form>
      </div>
    
      </>
    }
    </div>
  

    </div>
    </Container>
    </>
  )
}


export default index;

const Container = styled.div`
background-image: url("https://assets.nflxext.com/ffe/siteui/vlv3/5fd505fa-f425-4a18-b3cc-00dd2638f541/d638b1fe-b44f-4cb3-b5d8-2106904c3be0/IN-en-20220704-popsignuptwoweeks-perspective_alpha_website_large.jpg");
background-size:cover;
height:100vh;
width:100%;


    .screenGradient{
      height:100vh;
      width:100%;
      background: rgba(0,0,0, 0.4);
      background-image: linear-gradient(
        to top,
        rgba(0, 0, 0, 0.8) 0,
        rgba(0, 0, 0, 0) 60%,
        rgba(0, 0, 0, 0.8) 100%
      );
      display:flex;
      justify-content: center;

        .body{
          h1{
            font-size: 3.125rem;
            margin-bottom: 20px;
            font-weight:400;
          }
          h2{
            font-size: 2rem;
            margin-bottom: 30px;
            font-weight:400;
          }
          margin-left:auto;
          margin-right:auto;
          position: absolute;
          text-align: center;
          padding: 20px;
          top: 30%;
          z-index:1;
          color: white;
              .login-input{
                margin: 20px;
                input{
                  padding:10px;
                  outline-width:0;
                  height: 30px;
                  width: 30%;
                  border: none;
                  max-width: 600px;
                }
                .Lbtn{
                  padding: 16px 20px;
                  font-size: 1rem;
                  background-color: #e50914;
                  color: white;
                  border: none;
                  cursor: pointer;
                }
              }

              
        }

    }
`

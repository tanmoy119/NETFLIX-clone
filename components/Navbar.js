import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import axios from "axios";
import { useRouter } from "next/router";

function Navbar({logint,login,signin}) {
  const url = "https://netflix-api1.herokuapp.com/api/logout"
  //const url = "http://localhost:5000/api/logout"
  const router = useRouter();

  const [show, setShow] = useState(false);

  const transitionNavBar = ()=>{
    if(window.scrollY > 100){
      setShow(true);
    }else{
      setShow(false);
    }
  };

  useEffect(()=>{
    window.addEventListener("scroll", transitionNavBar);
    return ()=> window.removeEventListener("scroll", transitionNavBar);

  },[]);
  const Cokies = new Cookies();
  const token = Cokies.get('jwt');


  



  const logout = async (token)=>{

    const res = await axios({
      method: 'post',
      url: url,
      headers: {}, 
      data: {
        token:token 
        
      }
    });
    router.push('/');
   Cokies.remove('jwt');


  }

  

  return (
    <Nav style={{backgroundColor:show && '#111'}}>
       <Link href="/home"><LogoImg src='netflix.png' /></Link>
      {(logint)?(signin===false)?<>
      <button className="btn" onClick={()=>login()}>Sign In</button>
        </>:<></>:<>
        {/* <Link href='/profile'>
          </Link> */}
          <ProfileImg src='https://ps.w.org/metronet-profile-picture/assets/icon-256x256.png?rev=2464419' onClick={()=>logout(token)} />
        </>}
        
    </Nav>
  )
}

export default Navbar;

const Nav = styled.div`
position:fixed;
top:0;
display:flex;
height: 70px;
width: 100%;
justify-content: space-between;
padding: 10px;
z-index:1;
transition-time-function: ease-in;
transition: all 0.5s;
    .btn{
      position:fixed;
      right: 20px;
      padding: 10px 20px;
      background-color: #e50914;
      border: none;
      cursor: pointer;
      color:white;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 5px;
    }

`
const ProfileImg = styled.img`
cursor: pointer;
position: fixed;
right: 20px;
height: 50px;
width:50px;
border-radius: 50%;
`

const LogoImg = styled.img`
cursor: pointer;
margin-left: 20px;
`



import Cookies from "universal-cookie";
import Router  from 'next/router';






import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import jwt from 'jsonwebtoken';
import auth from '../middleware/Auth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';







const Auth = index=> async (req, res)=>{
  const Cokies = new Cookies();

  const user = Cokies.get('jwt');
  console.log(user);

  if(user){
    return{
      redirect:{
        destination: "/home",
        permanent: false,
      },
    };
  }else{
 
    return index(req, res);
  }
}






export default Auth;
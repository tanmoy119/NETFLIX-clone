import Head from 'next/head';
import Navbar from '../components/Navbar';
import Row from '../components/Row';
import requests from '../public/requests';
import Banner from '../components/Banner';
import  { Cookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';




const Index= ()=> {
  const [uData,setUserData] = useState({});
  const url = "https://netflix-api1.herokuapp.com/api/verify/jwt";
  //const url = "http://localhost:5000/api/verify/jwt";

  const router =  useRouter();

  const Cokies = new Cookies();


  const  token = Cokies.get('jwt');
  
  
 

  // Server-render loading state

  useEffect(()=>{
    
    
   (async ()=>{
    if(!token){
      router.push("/");
    }
     const res = await axios({
      method: 'post',
      url: url,
      headers: {}, 
      data: {
          token:token
        
      }
    }); 
    const user = res.data; 
     
    if(!user.verified){
      router.push("/");
    }else if(res.status == 200 ){
     setUserData(user);
    }
  })()
  },[url]);



  return (
    <>
    <Head>
      <title>Netflix</title>
      <link rel="shortcut icon" href="https://www.themanual.com/wp-content/uploads/sites/9/2021/12/netflixlogo-0-0.jpg?p=1#038;p=1.jpg" type='image/x-icon' />
    </Head>
    <Navbar/>
    <Banner/>
    <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow />
    <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
    <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
    <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
    <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
    <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
    <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
    <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </>
  )
}

export default Index;

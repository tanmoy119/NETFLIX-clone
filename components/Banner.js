import React, {useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from '../public/axios';
import requests from '../public/requests';

const baseUrlImg = 'https://image.tmdb.org/t/p/original/'; 

function Banner() {
    const [movie,setMovie] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length)
                ]
            ) 
            return request;
        };
        fetchData();
    }, []);
    
    function truncate(str, max) {
        return str?.length > max ? str.substr(0, max-1) + '…' : str;
      }

    
  return (
    <Header
    style={{
        
    backgroundSize: "cover",
    backgroundImage: `url(${baseUrlImg}${movie.backdrop_path})`,
    backgroundPosition: "center center",


    }}
    >
        <div className='content'>
        {/* Title */}
        <h1 className='title'>{movie?.original_name || movie?.name || movie?.title}</h1>
        {/* Div with 2 Buttons */}
        <button className='btn'>Play</button>
        <button className='btn'>My List</button>
        {/* Description */}
        <h1 className='description'>{truncate(movie?.overview, 150)}</h1>
        </div>
        <div className='banner__fadeBottom' />
    </Header>
  )
}

export default Banner;

const Header = styled.div`
    height: 550px;
    color: white;
    object-fit: contain;
   

      .content{
          margin-left: 30px;
          padding-top:140px;
          height: 190px;
          .title{
              font-size: 3rem;
              font-weight:800;
              padding-bottom:0.3rem;
          }
          .description{
              width: 45rem;
              line-height:1.3;
              padding-top: 1rem;
              font-size: 0.8rem;
              max-width: 360px;
              height: 80px;
          }
            .btn{
                cursor: pointer;
                color: #fff;
                outline: none;
                border: none;
                font-weight:700px;
                border-radious: 0.2vw;
                padding-left:2rem;
                padding-right:2rem;
                margin-right: 1rem;
                padding-top: 0.5rem;
                background-color: rgba(51, 51, 51, 0.5);
                padding-bottom: 0.5rem;
            
          }
          .btn:hover {
              color: #000;
              background-color: #e6e6e6;
              transition: all 0.2s;
          }
      }
      .banner__fadeBottom{
          height: 220px;
          background-image: linear-gradient(
              180deg,
              transparent,
              rgba(37,37,37,0.61),
              #111
          );
      }

`
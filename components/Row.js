import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from '../public/axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'; 

const baseUrlImg = 'https://image.tmdb.org/t/p/original/'; 

function Row({title, fetchUrl, isLargeRow }) {
    const [movies,setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    }, [fetchUrl]);

    const opts = {
        height:"450",
        width:"100%",
        playerVars:{
            autoplay: 1,
        },
    }

    const handeleClick = async (movie)=>{
        try {

            if(trailerUrl){
                setTrailerUrl('');
            }else{
    
             const url = await  movieTrailer(movie?.name || movie?.original_name || movie?.original_title || movie?.title, {id: true});
                     setTrailerUrl(url);
              
            }
            
        } catch (error) {
            console.log(error);
        }
      
    }


  return (
    <Container>
        {/* Title */}
        <h2 className={`${isLargeRow?'titleo':'titlen'}`}>{title}</h2>
        <RowPoster>
            {
                movies.map((movie)=>{
                    return(
                        <img className={`${isLargeRow?'imgo':'imgn'}`} onClick={() => handeleClick(movie)} key={movie.id} src={`${baseUrlImg}${isLargeRow?movie.poster_path : movie.backdrop_path}`} alt={movie.name} />
                    )
                })
            }
        </RowPoster>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </Container>
  )
}

export default Row;

const Container = styled.div`
    h2{
        color: white;
    }
    margin-left: 20px;
    
`

const RowPoster = styled.div`
display: flex;
overflow-y: hidden;
overflow-x: scroll;
padding: 40px;
    .titleo{
        padding-top: 20px;
    }
    ::-webkit-scrollbar {
        display: none;
    }

    .imgn{
        object-fit: contain;
        height:100px;
        width:100%;
        display: flex;
        margin-right: 20px;
        transition: transform 450ms;
        
    }
    .imgo{
        object-fit: contain;
        height: 250px;
        width:100%;
        display: flex;
        margin-right: 20px;
        transition: transform 450ms;
        
    }

    .imgn:hover {
        transform: scale(1.08);
        opacity:1;
    }
    .imgo:hover {
        transform: scale(1.09);
        opacity:1;
    }
`
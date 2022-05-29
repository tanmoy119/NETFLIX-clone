import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <Nav>
       <Link href="/"><LogoImg src='netflix.png' /></Link>

       <Link href='/profile'><ProfileImg src='https://ps.w.org/metronet-profile-picture/assets/icon-256x256.png?rev=2464419' /></Link> 
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
`
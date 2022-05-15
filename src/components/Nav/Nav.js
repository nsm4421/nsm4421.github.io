import './Nav.css'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useEffect, useState } from 'react';
import { getAuth, signOut } from "firebase/auth";
import UserStore from '../../store/UserStore';
import app from '../../api/App';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Logo = ({logoPath}) => {
 
    return (
        <div className='nav__logo'>
            <img src={logoPath}/>
            <h3>Karma</h3>
        </div>
    )
}

const AuthBanner = ({logined})=>{

    if (logined){
        return (
            <ul className='nav__banner' onClick={()=>{Logout()}}>
                <li><Link to="/">Logout</Link></li>
            </ul>
        )
    } else {
        return (
            <ul className='nav__banner'>             
                <li><Link to="login">Login</Link></li>
                <li><Link to="register">Register</Link></li>
            </ul>
        )
    }
}

const Logout = ()=>{  
    signOut(auth).then(() => {
        console.log("logout")
        localStorage.clear();
        console.log("cleared")
    }).catch((e) => {
        console.log(e)
    })  
}

const Nav = ({logined})=>{

    const logoPath = `${process.env.PUBLIC_URL}/logo.svg`
      
    return (
        <div className='nav__container'>
            
            <Logo logoPath = {logoPath}/>
            
            <AuthBanner logined={logined}/>

        </div>
    )
}

export default Nav;
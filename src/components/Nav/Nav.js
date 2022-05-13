import './Nav.css'
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { useEffect, useState } from 'react';

const Nav = ({user})=>{

    const logoPath = `${process.env.PUBLIC_URL}/logo.svg`

    return (
        <div className='nav__container'>
            
            <Logo logoPath = {logoPath}/>

            <AuthBanner/>

        </div>
    )
}

const Logo = ({logoPath}) => {
 
    return (
        <div className='nav__logo'>
            <img src={logoPath}/>
            <h3>Karma</h3>
        </div>
    )
}

const AuthBanner = ({user})=>{

    // const [width, setWidth] = useState(0)

    // useEffect(()=>{
    //     setWidth(window.innerWidth)
    // }, [window.innerWidth])

    // console.log(window.innerWidth)

    // if (width<600){
    //     return <UnfoldMoreIcon/>
    // }

    if (user){
        return (
            <ul className='nav__banner'>
                <li><a href="#">Login</a>z</li>
                <li><a href="#">Register</a></li>
            </ul>
        )
    }  else {
        return (
            <ul className='nav__banner'>             
                <li><a href="#">Login</a></li>
                <li><a href="#">Register</a></li>
            </ul>
        )
    }
}

export default Nav;
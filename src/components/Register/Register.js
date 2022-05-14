import './Register.css'
import { useEffect, useState } from 'react';
import RegisterBox from './RegisterBox'
import ValidateRegister from './ValidateRegister'
import { Alert } from '@mui/material';
import { Button } from '@mui/material';


const Register = ()=>{

    const UidBox = RegisterBox('uid');
    const PwBox = RegisterBox('password');
    const RePwBox = RegisterBox('rePassword');
    const EmailBox = RegisterBox('email');

    const [userInput, setUserInput] = useState({uid:"", password:"", rePassword:"", email:""});
    const [errMsg, setErrMsg] = useState("");

    const handleUserInput = (newObj)=>{
        setUserInput({...userInput, ...newObj});
    }

    const handleSubmit = ()=>{
        const validation = ValidateRegister(userInput);
      
        if (!validation.status){
            setErrMsg(validation.msg)
            return
        }
    }

    return(
        <div>
            
            {
                errMsg
                ? <Alert className='alert__msg' severity={"error"} 
                    onClick={()=>setErrMsg("")}>
                    {errMsg}</Alert>
                : null
            }    
           
            <div>
                <UidBox userInput={userInput} handleUserInput={handleUserInput}/>
                <PwBox  userInput={userInput} handleUserInput={handleUserInput}/>
                <RePwBox  userInput={userInput} handleUserInput={handleUserInput}/>
                <EmailBox userInput={userInput} handleUserInput={handleUserInput}/>
            </div>
            <Button onClick={()=>{handleSubmit()}}>Submit</Button>
        </div>
    );
};


export default Register;
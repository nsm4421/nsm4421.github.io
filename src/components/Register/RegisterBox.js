import './Register.css'
import { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';

// 사용자 입력
const InputBox = ({label, objKey, helperText, userInput, handleUserInput, inputType})=>{

    // 사용자 입력에 따라 state(userInput)을 변경하는 함수
    const handleChange = (e)=>{
        handleUserInput({[objKey]:e.target.value});
    };

    return (
        <div className='register__inner__box'>
            <p className='register__inner__label'>{label}</p>
            <div className='register__inner__stick'/>
            <Tooltip title={helperText}>
                <input type={inputType?inputType:'text'} className='register__inner__input' 
                    onChange={handleChange} value={userInput[objKey]}></input>
            </Tooltip>
        </div>        
    )
}

// User ID 입력 박스
const UidBox = ({userInput, handleUserInput})=>{

    // 아이디 입력이 10칸이 넘어가는 경우 -> Alert창
    useEffect(()=>{
        if (userInput.uid.length>15){
            handleUserInput({uid : userInput.uid.slice(0, 15)})
            alert("number of letter within 5~15")
        }    
    }, [userInput.uid])    

    return (
        <InputBox label={'User ID'} objKey={'uid'} userInput={userInput}
            helperText = {'Combinate alphabet, number and special symbols / number of letter within 5~15'}
            handleUserInput={handleUserInput}
        />
    )
}

// 비밀번호 입력 Box
const PwBox = ({userInput, handleUserInput})=>{
    
    useEffect(()=>{
        if (userInput.password.length>15){
            handleUserInput({password : userInput.password.slice(0, 15)})
            alert("number of letter within 5~15")
        }  
    }, [userInput.password])

    return (
        <InputBox label={'Password'} objKey={'password'} userInput={userInput}
            helperText = {'Combinate alphabet, number and special symbols / number of letter within 5~15'}
            handleUserInput={handleUserInput} inputType={'password'}
        />
    )
}

// 비밀번호 확인 Box
const RePwBox = ({userInput, handleUserInput})=>{
    
    useEffect(()=>{
        if (userInput.password.length>15){
            handleUserInput({rePassword : userInput.rePassword.slice(0, 15)})
            alert("number of letter within 5~15")
        }  
    }, [userInput.rePassword])

    return (
        <InputBox label={'Confirm'} objKey={'rePassword'} userInput={userInput}
            helperText = {'Press password again'}
            handleUserInput={handleUserInput} inputType={'password'}
        />
    )
}

// 이메일 주소 Box
const EmailBox = ({userInput, handleUserInput})=>{

    return (
        <InputBox label={'Email'} objKey={'email'} userInput={userInput}
            helperText = {'Email address for verification'}
            handleUserInput={handleUserInput} inputType={'email'}
        />  
    )
}

const RegisterBox = (type)=>{
    switch (type){
        case 'uid':
            return UidBox
        case 'password':
            return PwBox
        case 'rePassword':
            return RePwBox
        case 'email':
            return EmailBox
        default:
            return null
    }
};

export default RegisterBox;
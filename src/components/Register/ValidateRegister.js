const specialSymbols = ["`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "="];

const checkContainAlphabetAndNumber = (word)=>{
    const regex1 = new RegExp('[a-z]{1,}[0-9]{1,}');
    if (regex1.test(word)){
        return true
    }
    const regex2 = new RegExp('[a-z]{1,}[0-9]{1,}');
    if (regex2.test(word)){
        return true
    }
    return false
}

const checkContainSpecialSymbol = (word) => {
    for (const letter of specialSymbols){
        if (word.includes(letter)){
            return true
        }
    }
    return false
}

const removeSpecialSymbol = (word)=>{
    let res = word;
    for (let symbol of specialSymbols){
        res = res.replace(symbol,"");
    }
    return res
}

const checkUserId = (uid)=>{

    if (!uid){
        return {status:false, msg:'user id is not given'}
    }  
    
    if (uid.length>15 | uid.length<5){
        return {status:false, msg:'user id length is invalid'}
    }
    
    if (!checkContainAlphabetAndNumber(uid)){
        return {status:false, msg:('user id consist of alphabet and number')}
    } 

    return {status:true}

}

const checkPassword = (password)=>{
        
    if (!password){
        return {status:false, msg:'password is not given'}
    }  
    
    if (password.length>15 | password.length<5){
        return {status:false, msg:'password length is invalid'}
    }
    
    if (!checkContainAlphabetAndNumber(removeSpecialSymbol(password))){
        return {status:false, msg:'password must contain alphabet and number'}
    } 
    
    if (checkContainSpecialSymbol(password)){
        return {status:true, msg:null}
    }

    return {status:false, msg:'password must contain special symbol'}
}

const checkRePassword = (password, rePassword)=>{
        
    if (password === rePassword){
        return {status:true}
    } else {
        return {status:false, msg:'password and confirm password is not matched'}
    }
}

const checkEmail = (email)=>{
        
    if (!email){
        return {status:false, msg:'email address is not given'}
    }  

    return {status:true}

}

const ValidateRegister = (userInput)=>{

    const chk_uid = checkUserId(userInput.uid)
    const chk_password = checkPassword(userInput.password)
    const chk_re_password = checkRePassword(userInput.password, userInput.rePassword)
    const chk_email = checkEmail(userInput.email)

    if (!chk_uid.status){
        return chk_uid 
    }
    if (!chk_password.status){
        return chk_password
    }
    if (!chk_re_password.status){
        return chk_re_password
    }
    if (!chk_email.status){
        return chk_email
    }
    
    return {status:true, msg:null}
};

export default ValidateRegister;

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from './App.js'
import HandleDB from "./HandleDB.js";

const SaveNickName = async ({nickName})=>{
  const writer = HandleDB('write');
  const url = `user/email/`
  const payload = {nickName}
  return await writer(url, payload)
}

const HandleRegister = async ({userInput})=>{
  const auth = getAuth(app);

  const email = userInput.email;
  const password = userInput.password;
  const nickName = userInput.nickName;

  SaveNickName({nickName});
  
  return await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    return {status:true, user:user}
  })
  .catch((error) => {
    const errCode = error.code;
    const errMsg = error.message;
    return {status:false, errCode:errCode, errMsg:errMsg}
  });
}



export default HandleRegister;
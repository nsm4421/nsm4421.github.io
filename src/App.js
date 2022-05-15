import './App.css';
import HandleDB from './api/HandleDB';
import UserStore from './store/UserStore';
import { Home } from '@mui/icons-material';
import Nav from './components/Nav/Nav';
import { useEffect, useState } from 'react';
import WindowStore from './store/WindowStore'
import Register from './components/Register/Register';
import Login from './components/Register/Login';
import React from "react";
import {Link, Route, Switch, useHistory, useParams} from 'react-router-dom'
import Posting from './components/Posting/Posting'

const App = () => {

  // store
  const uStore = UserStore();
  const windowStore = WindowStore();
  const [logined, setLogined] = useState(false);

  useEffect(()=>{
    // 화면의 크기가 변경될 때마다 windowStore 업데이트
    const windowSize = {width:window.innerWidth, height:window.innerHeight}
    window.addEventListener('resize', ()=>{
      windowStore.setSize(windowSize)
    })
    // 새로고침시마다 local DB에 저장된 로그인 정보로 store 갱신
    try {
      const userString = localStorage.getItem('user')
      const user = JSON.parse(userString)
      if (user){
          uStore.setUser(user);
          setLogined(true);
      }
    } catch(e){
      console.log(e)
    }
  }, []);

  return (
    <div className="App">
      <input></input>
      <Nav logined={logined}/>   
      <Posting _id={'test_id'}/> 
      <Route path="/login"><Login/></Route>
      <Route path="/register"><Register/></Route>

    </div>
  );
}

export default App;

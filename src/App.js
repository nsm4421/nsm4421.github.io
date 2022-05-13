import './App.css';
import HandleDB from './api/HandleDB';
import UserStore from './store/UserStore';
import { Home } from '@mui/icons-material';
import Nav from './components/Nav/Nav';
import Posting from './components/Posting/Posting';
import { useEffect, useState } from 'react';
import WindowStore from './store/WindowStore'

const App = () => {

  // store
  const userStore = UserStore();
  const windowStore = WindowStore();

  // 화면의 크기가 변경될 때마다 windowStore 업데이트
  useEffect(()=>{
    const windowSize = {width:window.innerWidth, height:window.innerHeight}
    window.addEventListener('resize', ()=>{
      windowStore.setSize(windowSize)
    })
  }, [])

  return (
    <div className="App">
      <Nav/>
      <div>
        <Posting/>
      </div>
    </div>
  );
}

export default App;

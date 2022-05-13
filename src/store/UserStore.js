import create from 'zustand';

const UserStore = create((set)=>({
    user : {
      name : null,
      thumbNail : null,
      info : null,
    },
    setUser(u){set(()=>({user:u}))}
}))

export default UserStore;



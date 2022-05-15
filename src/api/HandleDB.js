import { getDatabase, ref, set, child, get, push, update} from "firebase/database";
import app from './App'

const database = getDatabase(app);

const _get =  async (url) => {

    const dbRef = ref(database);
    return await get(child(dbRef, url))
    .then((snapshot)=>{
      const data = snapshot.val()
      if (data){
        return {status:true, data:data}
      } else {
        return {status: false, message:'No Data Found'}
      }
    })
    .catch((e)=>{
      return {status:false, message:e}
    })
}

const _write = async (url, payload) => {
  const dbRef = ref(database, url);
  try {
    await set(dbRef, payload)
    return {status:true}
  } catch {
    return {status:false}
  }
}

const _add = async (url, payload)=>{
    const dbRef = ref(database).toString();
    return fetch(`${dbRef}/${url}.json`,{
      method:'POST',
      body:JSON.stringify(payload)
    })
    .then(res=>{
      console.log(res)
        if (res.status!=200){
            return {status:false, msg:res.statusText, code:res.status};
        }
        return {status:false}
    }).catch((e)=>{
      return {status:false}
    })
}

const HandleDB = (action)=>{
  switch (action){
    case 'get':
      return _get
    case 'write':
      return _write
    case 'add':
      return _add
    default:
      return
  }
}

export default HandleDB;
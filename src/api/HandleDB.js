import { getDatabase, ref, set, child, get } from "firebase/database";
import app from './App'

const database = getDatabase(app);

const _get =  async (url) => {

    const dbRef = ref(database);
    return await get(child(dbRef, url))
    .then((snapshot)=>{
      const data = snapshot.val()
      if (data){
        return {status:'success', data:data}
      } else {
        return {status:'failure', message:'No Data Found'}
      }
    })
    .catch((e)=>{
      return {status:'failure', message:e}
    })

}

const _write = async (url, payload) => {
  const dbRef = ref(database, url);
  try {
    await set(dbRef, payload)
    return {status:'success'}
  } catch {
    return {status:'failure'}
  }
}

const HandleDB = (action)=>{
  switch (action){
    case 'get':
      return _get
    case 'write':
      return _write
    default:
      return
  }
}

export default HandleDB;
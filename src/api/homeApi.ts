import api from "./http.ts";

export async function getHomeList(){
    await api.get('/home').then(res=>{
        console.log('home',res.data);
    })
}
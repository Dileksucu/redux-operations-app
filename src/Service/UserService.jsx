import axios from "axios";
import { Url } from "../BaseUrl";


//Burada post kısmında yaptığım status ile kontrolden sonra tekrar get api çağırmam doğru kullanım değil
//tekrar dispatch ile get api istek atmam gerekir. 

const getUserAll = () => {
  return axios.get(`${Url}`);
};

const getUserById = (id) => {
  // console.log("dilek",id)
  return axios.get(`${Url}/${id}`);
};

const UserPost = (request) => {
  return axios.post(`${Url}`,request)
};

const UserDelete = (id) => {
  return axios.delete(`${Url}/${id}`);
};

const UpdateUser=(res)=>{
  return axios.put(`${Url}`,res)
}

let UserService = {
  getUserAll,
  getUserById,
  UserPost,
  UserDelete,
  UpdateUser
};

export default UserService;

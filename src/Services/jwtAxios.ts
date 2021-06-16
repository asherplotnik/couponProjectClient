import axios from 'axios';
import { removeSessionAction } from '../Redux/SessionState';
import store from '../Redux/Store';

const jwtAxios = axios.create();

// Request interceptor - מה אנו רוצים לבצע בכל שליחת בקשה לשרת
jwtAxios.interceptors.request.use(request => {

    request.headers = {
        "token": store.getState().SessionState.session.token
    };

    return request;
});

jwtAxios.interceptors.response.use(
    successRes => {
       return successRes;
    }, 
    error => {
      if (error.response.data.status===401){
        store.dispatch(removeSessionAction());
      }
      return Promise.reject(error);
    }
  );


export default jwtAxios;

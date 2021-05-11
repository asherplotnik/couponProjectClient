import axios from 'axios';
import store from '../Redux/Store';

const jwtAxios = axios.create();

// Request interceptor - מה אנו רוצים לבצע בכל שליחת בקשה לשרת
jwtAxios.interceptors.request.use(request => {

    request.headers = {
        "token": store.getState().SessionState.session.token
    };

    return request;
});

export default jwtAxios;

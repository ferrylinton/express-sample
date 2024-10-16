import Cookies from "js-cookie";

export const getToken = () => {
    const token = Cookies.get('token');
    if (token) {
        return "Bearer " + token;
    }else{
        window.location.replace('/');
    }
}
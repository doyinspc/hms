import {
    USER_LOGIN,
    USER_LOGIN_ERROR,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_GET_MULTIPLE,
    USER_GET_ONE,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOADING,
    USER_LOADING_ERROR,
    USER_ACTIVATE_FAIL,
    USER_ACTIVATE_SUCCESS,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_EDIT
} from "../types/user";
import Swal from 'sweetalert2';

 const callError = ($err) =>{
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Check your internet connection or confirm you are using the right loging information',
        showConfirmButton: false,
        timer: 1500
      })
 }
 const callLoading = () =>{
    Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Please wait... processing',
        showConfirmButton: false,
        timer: 1500
      })
 }
let user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : {};
let auth = localStorage.getItem('auth') !== 'undefined' ? JSON.parse(localStorage.getItem('auth')) : false;
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: auth  && parseInt(auth) === 1? true : false,
    isLoading: false,
    isAdmin: user && parseInt(user.is_admin) === 1 ? true : false,
    isRegistered: user && user.id > 1 ? true: false,
    user: user ? user : {},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newUser = [...aluu];
    newUser.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newUser;
}


export default function(state = initialState, action){
    switch (action.type) {
        case USER_LOADING:
            callLoading();
            return {
                ...state,
                isLoading : true
            };
        case USER_LOGIN:
            localStorage.setItem('token', action.token)
            localStorage.setItem('auth', JSON.stringify(1));
            localStorage.setItem('user', JSON.stringify(action.payload))
            
            return {
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload,
                isAdmin: action.payload.is_admin
            }; 
       
        case USER_LOADING_ERROR:
        case USER_ACTIVATE_FAIL:
        case USER_REGISTER_FAIL:
        case USER_DELETE_FAIL:
        case USER_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        case USER_LOGOUT_SUCCESS:
        case USER_LOGOUT_FAIL:
            localStorage.removeItem('token')
            localStorage.removeItem('auth')
            localStorage.removeItem('user')
            localStorage.removeItem('user')

            return{
                ...state,
                token: null,
                isRegistered: true,
                isAuthenticated: false,
                isLoading: false,
                user: {},
                isAdmin : null
            } 
        case USER_LOGIN_ERROR:
            localStorage.removeItem('token')
            localStorage.removeItem('auth')
            localStorage.removeItem('user')
            callError(action.payload);
            return{
                ...state,
                token: null,
                isRegistered: true,
                isAuthenticated: false,
                isLoading: false,
                user: {},
                user: {},
                isAdmin : null
            } 
        default:
            return state;
    }

}
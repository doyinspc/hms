import {
    USERSTAFF_LOGIN,
    USERSTAFF_LOGIN_ERROR,
    USERSTAFF_LOGOUT_SUCCESS,
    USERSTAFF_LOGOUT_FAIL,
    USERSTAFF_GET_MULTIPLE,
    USERSTAFF_GET_ONE,
    USERSTAFF_REGISTER_SUCCESS,
    USERSTAFF_REGISTER_FAIL,
    USERSTAFF_LOADING,
    USERSTAFF_LOADING_ERROR,
    USERSTAFF_ACTIVATE_FAIL,
    USERSTAFF_ACTIVATE_SUCCESS,
    USERSTAFF_UPDATE_SUCCESS,
    USERSTAFF_UPDATE_FAIL,
    USERSTAFF_DELETE_SUCCESS,
    USERSTAFF_DELETE_FAIL,
    USERSTAFF_EDIT
} from "../types/userstaff";
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
let userstaffStore = localStorage.getItem('userstaff') !== 'undefined' ? JSON.parse(localStorage.getItem('userstaff')):[];
let user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : {};
let auth = localStorage.getItem('auth') !== 'undefined' ? JSON.parse(localStorage.getItem('auth')) : false;
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: auth  && parseInt(auth) === 1? true : false,
    isLoading: false,
    isAdmin: user && parseInt(user.is_admin) === 1 ? true : false,
    isRegistered: userstaffStore && userstaffStore.id > 1 ? true: false,
    user: user ? user : {},
    userstaffs: userstaffStore,
    userstaff:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newUserstaff = [...aluu];
    newUserstaff.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newUserstaff;
}


export default function(state = initialState, action){
    switch (action.type) {
        case USERSTAFF_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case USERSTAFF_LOADING:
            callLoading();
            return {
                ...state,
                isLoading : true
            };
        case USERSTAFF_LOGIN:
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
        case USERSTAFF_GET_MULTIPLE:
            localStorage.setItem('userstaff', JSON.stringify(action.payload));
            return {
                ...state,
                userstaffs : action.payload,

                msg:'DONE!!!'
            };
        case USERSTAFF_GET_ONE:
            let all = [...state.userstaffs];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                userstaff : ses,
                MSG:"DONE!!!"
            };
        case USERSTAFF_REGISTER_SUCCESS:
            localStorage.setItem('userstaff', JSON.stringify([...state.userstaffs, action.payload]));
            return {
                ...state,
                userstaffs: [...state.userstaffs, action.payload],
                msg:action.msg
            }; 
        case USERSTAFF_ACTIVATE_SUCCESS:
            let ac = changeState(state.userstaffs, action.payload);
            localStorage.setItem('userstaff', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                userstaffs: ac
            }
        case USERSTAFF_DELETE_SUCCESS:
            let rem = state.userstaffs.filter(cat => cat.id != action.payload.id);
            localStorage.setItem('userstaff', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                userstaffs: rem
            }
        case USERSTAFF_UPDATE_SUCCESS:
            const findInd = state.userstaffs.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.userstaffs];
            newState[findInd] = action.payload;
            localStorage.setItem('userstaff', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                userstaffs : newState,
                userstaff : action.payload
            }; 
        case USERSTAFF_LOADING_ERROR:
        case USERSTAFF_ACTIVATE_FAIL:
        case USERSTAFF_REGISTER_FAIL:
        case USERSTAFF_DELETE_FAIL:
        case USERSTAFF_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        case USERSTAFF_LOGOUT_SUCCESS:
        case USERSTAFF_LOGOUT_FAIL:
            localStorage.removeItem('token')
            localStorage.removeItem('auth')
            localStorage.removeItem('userstaff')
            localStorage.removeItem('user')

            return{
                ...state,
                token: null,
                isRegistered: true,
                isAuthenticated: false,
                isLoading: false,
                userstaff: {},
                user: {},
                isAdmin : null
            } 
        case USERSTAFF_LOGIN_ERROR:
            localStorage.removeItem('token')
            localStorage.removeItem('auth')
            localStorage.removeItem('userstaff')
            localStorage.removeItem('user')
            callError(action.payload);
            return{
                ...state,
                token: null,
                isRegistered: true,
                isAuthenticated: false,
                isLoading: false,
                userstaff: {},
                user: {},
                isAdmin : null
            } 
        default:
            return state;
    }

}
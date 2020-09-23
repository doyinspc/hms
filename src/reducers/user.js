import {
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

let userStore = JSON.parse(localStorage.getItem('user'))

const initialState = {
    isLoading: false,
    users: userStore ? userStore : [],
    user:{},
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
        case USER_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case USER_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case USER_GET_MULTIPLE:
            localStorage.setItem('user', JSON.stringify(action.payload));
            return {
                ...state,
                users : action.payload,
                msg:'DONE!!!'
            };
        case USER_GET_ONE:
            let all = [...state.users];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                user : ses,
                MSG:"DONE!!!"
            };
        case USER_REGISTER_SUCCESS:
            localStorage.setItem('user', JSON.stringify([...state.users, action.payload]));
            return {
                ...state,
                users: [...state.users, action.payload],
                msg:action.msg
            }; 
        case USER_ACTIVATE_SUCCESS:
            let ac = changeState(state.users, action.payload);
            localStorage.setItem('user', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                users: ac
            }
        case USER_DELETE_SUCCESS:
            let rem = state.users.filter(cat => cat.id != action.payload);
            localStorage.setItem('user', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                users: rem
            }
        case USER_UPDATE_SUCCESS:
            const findInd = state.users.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.users];
            newState[findInd] = action.payload;
            localStorage.setItem('user', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                users : newState,
                user:action.payload
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
        default:
            return state;
    }

}
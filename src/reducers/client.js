import {
    CLIENT_GET_MULTIPLE,
    CLIENT_GET_ONE,
    CLIENT_REGISTER_SUCCESS,
    CLIENT_REGISTER_FAIL,
    CLIENT_LOADING,
    CLIENT_LOADING_ERROR,
    CLIENT_ACTIVATE_FAIL,
    CLIENT_ACTIVATE_SUCCESS,
    CLIENT_UPDATE_SUCCESS,
    CLIENT_UPDATE_FAIL,
    CLIENT_DELETE_SUCCESS,
    CLIENT_DELETE_FAIL,
    CLIENT_EDIT
} from "../types/client";

let clientStore = JSON.parse(localStorage.getItem('client'))

const initialState = {
    isLoading: false,
    clients: clientStore ? clientStore : [],
    client:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newClient = [...aluu];
    newClient.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newClient;
}


export default function(state = initialState, action){
    switch (action.type) {
        case CLIENT_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case CLIENT_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case CLIENT_GET_MULTIPLE:
            localStorage.setItem('client', JSON.stringify(action.payload));
            return {
                ...state,
                clients : action.payload,
                msg:'DONE!!!'
            };
        case CLIENT_GET_ONE:
            let all = [...state.clients];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                client : ses,
                MSG:"DONE!!!"
            };
        case CLIENT_REGISTER_SUCCESS:
            localStorage.setItem('client', JSON.stringify([...state.clients, action.payload]));
            return {
                ...state,
                clients: [...state.clients, action.payload],
                msg:action.msg
            }; 
        case CLIENT_ACTIVATE_SUCCESS:
            let ac = changeState(state.clients, action.payload);
            localStorage.setItem('client', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                clients: ac
            }
        case CLIENT_DELETE_SUCCESS:
            let rem = state.clients.filter(cat => cat.id != action.payload);
            localStorage.setItem('client', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                clients: rem
            }
        case CLIENT_UPDATE_SUCCESS:
            const findInd = state.clients.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.clients];
            newState[findInd] = action.payload;
            localStorage.setItem('client', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                clients : newState,
                client:action.payload
            }; 
        case CLIENT_LOADING_ERROR:
        case CLIENT_ACTIVATE_FAIL:
        case CLIENT_REGISTER_FAIL:
        case CLIENT_DELETE_FAIL:
        case CLIENT_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
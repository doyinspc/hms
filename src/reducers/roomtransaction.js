import {
    ROOMTRANSACTION_GET_MULTIPLE,
    ROOMTRANSACTION_GET_ONE,
    ROOMTRANSACTION_REGISTER_SUCCESS,
    ROOMTRANSACTION_REGISTER_FAIL,
    ROOMTRANSACTION_LOADING,
    ROOMTRANSACTION_LOADING_ERROR,
    ROOMTRANSACTION_ACTIVATE_FAIL,
    ROOMTRANSACTION_ACTIVATE_SUCCESS,
    ROOMTRANSACTION_UPDATE_SUCCESS,
    ROOMTRANSACTION_UPDATE_FAIL,
    ROOMTRANSACTION_DELETE_SUCCESS,
    ROOMTRANSACTION_DELETE_FAIL,
    ROOMTRANSACTION_EDIT
} from "../types/roomtransaction";

let roomtransactionStore = JSON.parse(localStorage.getItem('roomtransaction'))

const initialState = {
    isLoading: false,
    roomtransactions: roomtransactionStore ? roomtransactionStore : [],
    roomtransaction:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newRoomtransaction = [...aluu];
    newRoomtransaction.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newRoomtransaction;
}


export default function(state = initialState, action){
    switch (action.type) {
        case ROOMTRANSACTION_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case ROOMTRANSACTION_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case ROOMTRANSACTION_GET_MULTIPLE:
            localStorage.setItem('roomtransaction', JSON.stringify(action.payload));
            return {
                ...state,
                roomtransactions : action.payload,
                msg:'DONE!!!'
            };
        case ROOMTRANSACTION_GET_ONE:
            let all = [...state.roomtransactions];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                roomtransaction : ses,
                MSG:"DONE!!!"
            };
        case ROOMTRANSACTION_REGISTER_SUCCESS:
            localStorage.setItem('roomtransaction', JSON.stringify([...state.roomtransactions, action.payload]));
            return {
                ...state,
                roomtransactions: [...state.roomtransactions, action.payload],
                msg:action.msg
            }; 
        case ROOMTRANSACTION_ACTIVATE_SUCCESS:
            let ac = changeState(state.roomtransactions, action.payload);
            localStorage.setItem('roomtransaction', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                roomtransactions: ac
            }
        case ROOMTRANSACTION_DELETE_SUCCESS:
            let rem = state.roomtransactions.filter(cat => cat.id != action.payload);
            localStorage.setItem('roomtransaction', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                roomtransactions: rem
            }
        case ROOMTRANSACTION_UPDATE_SUCCESS:
            const findInd = state.roomtransactions.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.roomtransactions];
            newState[findInd] = action.payload;
            localStorage.setItem('roomtransaction', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                roomtransactions : newState,
                roomtransaction:action.payload
            }; 
        case ROOMTRANSACTION_LOADING_ERROR:
        case ROOMTRANSACTION_ACTIVATE_FAIL:
        case ROOMTRANSACTION_REGISTER_FAIL:
        case ROOMTRANSACTION_DELETE_FAIL:
        case ROOMTRANSACTION_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
import {
    USERTRANSACTION_GET_MULTIPLE,
    USERTRANSACTION_GET_ONE,
    USERTRANSACTION_REGISTER_SUCCESS,
    USERTRANSACTION_REGISTER_FAIL,
    USERTRANSACTION_LOADING,
    USERTRANSACTION_LOADING_ERROR,
    USERTRANSACTION_ACTIVATE_FAIL,
    USERTRANSACTION_ACTIVATE_SUCCESS,
    USERTRANSACTION_UPDATE_SUCCESS,
    USERTRANSACTION_UPDATE_FAIL,
    USERTRANSACTION_DELETE_SUCCESS,
    USERTRANSACTION_DELETE_FAIL,
    USERTRANSACTION_EDIT
} from "../types/usertransaction";

let usertransactionStore = JSON.parse(localStorage.getItem('usertransaction'))

const initialState = {
    isLoading: false,
    usertransactions: usertransactionStore ? usertransactionStore : [],
    usertransaction:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newUsertransaction = [...aluu];
    newUsertransaction.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newUsertransaction;
}


export default function(state = initialState, action){
    switch (action.type) {
        case USERTRANSACTION_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case USERTRANSACTION_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case USERTRANSACTION_GET_MULTIPLE:
            localStorage.setItem('usertransaction', JSON.stringify(action.payload));
            return {
                ...state,
                usertransactions : action.payload,
                msg:'DONE!!!'
            };
        case USERTRANSACTION_GET_ONE:
            let all = [...state.usertransactions];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                usertransaction : ses,
                MSG:"DONE!!!"
            };
        case USERTRANSACTION_REGISTER_SUCCESS:
            localStorage.setItem('usertransaction', JSON.stringify([...state.usertransactions, action.payload]));
            return {
                ...state,
                usertransactions: [...state.usertransactions, action.payload],
                msg:action.msg
            }; 
        case USERTRANSACTION_ACTIVATE_SUCCESS:
            let ac = changeState(state.usertransactions, action.payload);
            localStorage.setItem('usertransaction', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                usertransactions: ac
            }
        case USERTRANSACTION_DELETE_SUCCESS:
            let rem = state.usertransactions.filter(cat => cat.id != action.payload);
            localStorage.setItem('usertransaction', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                usertransactions: rem
            }
        case USERTRANSACTION_UPDATE_SUCCESS:
            const findInd = state.usertransactions.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.usertransactions];
            newState[findInd] = action.payload;
            localStorage.setItem('usertransaction', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                usertransactions : newState,
                usertransaction:action.payload
            }; 
        case USERTRANSACTION_LOADING_ERROR:
        case USERTRANSACTION_ACTIVATE_FAIL:
        case USERTRANSACTION_REGISTER_FAIL:
        case USERTRANSACTION_DELETE_FAIL:
        case USERTRANSACTION_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
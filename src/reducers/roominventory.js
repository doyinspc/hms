import {
    ROOMINVENTORY_GET_MULTIPLE,
    ROOMINVENTORY_GET_ONE,
    ROOMINVENTORY_REGISTER_SUCCESS,
    ROOMINVENTORY_REGISTER_FAIL,
    ROOMINVENTORY_LOADING,
    ROOMINVENTORY_LOADING_ERROR,
    ROOMINVENTORY_ACTIVATE_FAIL,
    ROOMINVENTORY_ACTIVATE_SUCCESS,
    ROOMINVENTORY_UPDATE_SUCCESS,
    ROOMINVENTORY_UPDATE_FAIL,
    ROOMINVENTORY_DELETE_SUCCESS,
    ROOMINVENTORY_DELETE_FAIL,
    ROOMINVENTORY_EDIT
} from "../types/roominventory";

let roominventoryStore = JSON.parse(localStorage.getItem('roominventory'))

const initialState = {
    isLoading: false,
    roominventorys: roominventoryStore ? roominventoryStore : [],
    roominventory:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newRoominventory = [...aluu];
    newRoominventory.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newRoominventory;
}


export default function(state = initialState, action){
    switch (action.type) {
        case ROOMINVENTORY_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case ROOMINVENTORY_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case ROOMINVENTORY_GET_MULTIPLE:
            localStorage.setItem('roominventory', JSON.stringify(action.payload));
            return {
                ...state,
                roominventorys : action.payload,
                msg:'DONE!!!'
            };
        case ROOMINVENTORY_GET_ONE:
            let all = [...state.roominventorys];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                roominventory : ses,
                MSG:"DONE!!!"
            };
        case ROOMINVENTORY_REGISTER_SUCCESS:
            localStorage.setItem('roominventory', JSON.stringify([...state.roominventorys, action.payload]));
            return {
                ...state,
                roominventorys: [...state.roominventorys, action.payload],
                msg:action.msg
            }; 
        case ROOMINVENTORY_ACTIVATE_SUCCESS:
            let ac = changeState(state.roominventorys, action.payload);
            localStorage.setItem('roominventory', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                roominventorys: ac
            }
        case ROOMINVENTORY_DELETE_SUCCESS:
            let rem = state.roominventorys.filter(cat => cat.id != action.payload);
            localStorage.setItem('roominventory', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                roominventorys: rem
            }
        case ROOMINVENTORY_UPDATE_SUCCESS:
            const findInd = state.roominventorys.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.roominventorys];
            newState[findInd] = action.payload;
            localStorage.setItem('roominventory', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                roominventorys : newState,
                roominventory:action.payload
            }; 
        case ROOMINVENTORY_LOADING_ERROR:
        case ROOMINVENTORY_ACTIVATE_FAIL:
        case ROOMINVENTORY_REGISTER_FAIL:
        case ROOMINVENTORY_DELETE_FAIL:
        case ROOMINVENTORY_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
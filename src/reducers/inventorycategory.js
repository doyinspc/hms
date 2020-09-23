import {
    INVENTORYCATEGORY_GET_MULTIPLE,
    INVENTORYCATEGORY_GET_ONE,
    INVENTORYCATEGORY_REGISTER_SUCCESS,
    INVENTORYCATEGORY_REGISTER_FAIL,
    INVENTORYCATEGORY_LOADING,
    INVENTORYCATEGORY_LOADING_ERROR,
    INVENTORYCATEGORY_ACTIVATE_FAIL,
    INVENTORYCATEGORY_ACTIVATE_SUCCESS,
    INVENTORYCATEGORY_UPDATE_SUCCESS,
    INVENTORYCATEGORY_UPDATE_FAIL,
    INVENTORYCATEGORY_DELETE_SUCCESS,
    INVENTORYCATEGORY_DELETE_FAIL,
    INVENTORYCATEGORY_EDIT
} from "../types/inventorycategory";

let inventorycategoryStore = JSON.parse(localStorage.getItem('inventorycategory'))

const initialState = {
    isLoading: false,
    inventorycategorys: inventorycategoryStore ? inventorycategoryStore : [],
    inventorycategory:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newInventorycategory = [...aluu];
    newInventorycategory.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newInventorycategory;
}


export default function(state = initialState, action){
    switch (action.type) {
        case INVENTORYCATEGORY_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case INVENTORYCATEGORY_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case INVENTORYCATEGORY_GET_MULTIPLE:
            localStorage.setItem('inventorycategory', JSON.stringify(action.payload));
            return {
                ...state,
                inventorycategorys : action.payload,
                msg:'DONE!!!'
            };
        case INVENTORYCATEGORY_GET_ONE:
            let all = [...state.inventorycategorys];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                inventorycategory : ses,
                MSG:"DONE!!!"
            };
        case INVENTORYCATEGORY_REGISTER_SUCCESS:
            localStorage.setItem('inventorycategory', JSON.stringify([...state.inventorycategorys, action.payload]));
            return {
                ...state,
                inventorycategorys: [...state.inventorycategorys, action.payload],
                msg:action.msg
            }; 
        case INVENTORYCATEGORY_ACTIVATE_SUCCESS:
            let ac = changeState(state.inventorycategorys, action.payload);
            localStorage.setItem('inventorycategory', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                inventorycategorys: ac
            }
        case INVENTORYCATEGORY_DELETE_SUCCESS:
            let rem = state.inventorycategorys.filter(cat => cat.id != action.payload);
            localStorage.setItem('inventorycategory', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                inventorycategorys: rem
            }
        case INVENTORYCATEGORY_UPDATE_SUCCESS:
            const findInd = state.inventorycategorys.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.inventorycategorys];
            newState[findInd] = action.payload;
            localStorage.setItem('inventorycategory', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                inventorycategorys : newState,
                inventorycategory:action.payload
            }; 
        case INVENTORYCATEGORY_LOADING_ERROR:
        case INVENTORYCATEGORY_ACTIVATE_FAIL:
        case INVENTORYCATEGORY_REGISTER_FAIL:
        case INVENTORYCATEGORY_DELETE_FAIL:
        case INVENTORYCATEGORY_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
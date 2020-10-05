import {
    USERCATEGORY_GET_MULTIPLE,
    USERCATEGORY_GET_ONE,
    USERCATEGORY_REGISTER_SUCCESS,
    USERCATEGORY_REGISTER_FAIL,
    USERCATEGORY_LOADING,
    USERCATEGORY_LOADING_ERROR,
    USERCATEGORY_ACTIVATE_FAIL,
    USERCATEGORY_ACTIVATE_SUCCESS,
    USERCATEGORY_UPDATE_SUCCESS,
    USERCATEGORY_UPDATE_FAIL,
    USERCATEGORY_DELETE_SUCCESS,
    USERCATEGORY_DELETE_FAIL,
    USERCATEGORY_EDIT
} from "../types/usercategory";

let usercategoryStore = JSON.parse(localStorage.getItem('usercategory'))

const initialState = {
    isLoading: false,
    usercategorys: usercategoryStore ? usercategoryStore : [],
    usercategory:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newUsercategory = [...aluu];
    newUsercategory.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newUsercategory;
}


export default function(state = initialState, action){
    switch (action.type) {
        case USERCATEGORY_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case USERCATEGORY_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case USERCATEGORY_GET_MULTIPLE:
            localStorage.setItem('usercategory', JSON.stringify(action.payload));
            return {
                ...state,
                usercategorys : action.payload,
                msg:'DONE!!!'
            };
        case USERCATEGORY_GET_ONE:
            let all = [...state.usercategorys];
            let ses = all.filter(row=>parseInt(row.id) === parseInt(action.payload))[0];
            console.log(ses, action.payload );
            return {
                ...state,
                usercategory : ses,
                MSG:"DONE!!!"
            };
        case USERCATEGORY_REGISTER_SUCCESS:
            localStorage.setItem('usercategory', JSON.stringify([...state.usercategorys, action.payload]));
            return {
                ...state,
                usercategorys: [...state.usercategorys, action.payload],
                msg:action.msg
            }; 
        case USERCATEGORY_ACTIVATE_SUCCESS:
            let ac = changeState(state.usercategorys, action.payload);
            localStorage.setItem('usercategory', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                usercategorys: ac
            }
        case USERCATEGORY_DELETE_SUCCESS:
            let rem = state.usercategorys.filter(cat => cat.id != action.payload);
            localStorage.setItem('usercategory', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                usercategorys: rem
            }
        case USERCATEGORY_UPDATE_SUCCESS:
            const findInd = state.usercategorys.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.usercategorys];
            newState[findInd] = action.payload;
            localStorage.setItem('usercategory', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                usercategorys : newState,
                usercategory:action.payload
            }; 
        case USERCATEGORY_LOADING_ERROR:
        case USERCATEGORY_ACTIVATE_FAIL:
        case USERCATEGORY_REGISTER_FAIL:
        case USERCATEGORY_DELETE_FAIL:
        case USERCATEGORY_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
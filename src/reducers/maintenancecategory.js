import {
    MAINTENANCECATEGORY_GET_MULTIPLE,
    MAINTENANCECATEGORY_GET_ONE,
    MAINTENANCECATEGORY_REGISTER_SUCCESS,
    MAINTENANCECATEGORY_REGISTER_FAIL,
    MAINTENANCECATEGORY_LOADING,
    MAINTENANCECATEGORY_LOADING_ERROR,
    MAINTENANCECATEGORY_ACTIVATE_FAIL,
    MAINTENANCECATEGORY_ACTIVATE_SUCCESS,
    MAINTENANCECATEGORY_UPDATE_SUCCESS,
    MAINTENANCECATEGORY_UPDATE_FAIL,
    MAINTENANCECATEGORY_DELETE_SUCCESS,
    MAINTENANCECATEGORY_DELETE_FAIL,
    MAINTENANCECATEGORY_EDIT
} from "../types/maintenancecategory";

let maintenancecategoryStore = JSON.parse(localStorage.getItem('maintenancecategory'))

const initialState = {
    isLoading: false,
    maintenancecategorys: maintenancecategoryStore ? maintenancecategoryStore : [],
    maintenancecategory:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newMaintenancecategory = [...aluu];
    newMaintenancecategory.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newMaintenancecategory;
}


export default function(state = initialState, action){
    switch (action.type) {
        case MAINTENANCECATEGORY_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case MAINTENANCECATEGORY_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case MAINTENANCECATEGORY_GET_MULTIPLE:
            localStorage.setItem('maintenancecategory', JSON.stringify(action.payload));
            return {
                ...state,
                maintenancecategorys : action.payload,
                msg:'DONE!!!'
            };
        case MAINTENANCECATEGORY_GET_ONE:
            let all = [...state.maintenancecategorys];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                maintenancecategory : ses,
                MSG:"DONE!!!"
            };
        case MAINTENANCECATEGORY_REGISTER_SUCCESS:
            localStorage.setItem('maintenancecategory', JSON.stringify([...state.maintenancecategorys, action.payload]));
            return {
                ...state,
                maintenancecategorys: [...state.maintenancecategorys, action.payload],
                msg:action.msg
            }; 
        case MAINTENANCECATEGORY_ACTIVATE_SUCCESS:
            let ac = changeState(state.maintenancecategorys, action.payload);
            localStorage.setItem('maintenancecategory', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                maintenancecategorys: ac
            }
        case MAINTENANCECATEGORY_DELETE_SUCCESS:
            let rem = state.maintenancecategorys.filter(cat => cat.id != action.payload);
            localStorage.setItem('maintenancecategory', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                maintenancecategorys: rem
            }
        case MAINTENANCECATEGORY_UPDATE_SUCCESS:
            const findInd = state.maintenancecategorys.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.maintenancecategorys];
            newState[findInd] = action.payload;
            localStorage.setItem('maintenancecategory', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                maintenancecategorys : newState,
                maintenancecategory:action.payload
            }; 
        case MAINTENANCECATEGORY_LOADING_ERROR:
        case MAINTENANCECATEGORY_ACTIVATE_FAIL:
        case MAINTENANCECATEGORY_REGISTER_FAIL:
        case MAINTENANCECATEGORY_DELETE_FAIL:
        case MAINTENANCECATEGORY_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
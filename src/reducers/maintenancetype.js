import {
    MAINTENANCETYPE_GET_MULTIPLE,
    MAINTENANCETYPE_GET_ONE,
    MAINTENANCETYPE_REGISTER_SUCCESS,
    MAINTENANCETYPE_REGISTER_FAIL,
    MAINTENANCETYPE_LOADING,
    MAINTENANCETYPE_LOADING_ERROR,
    MAINTENANCETYPE_ACTIVATE_FAIL,
    MAINTENANCETYPE_ACTIVATE_SUCCESS,
    MAINTENANCETYPE_UPDATE_SUCCESS,
    MAINTENANCETYPE_UPDATE_FAIL,
    MAINTENANCETYPE_DELETE_SUCCESS,
    MAINTENANCETYPE_DELETE_FAIL,
    MAINTENANCETYPE_EDIT
} from "../types/maintenancetype";

let maintenancetypeStore = JSON.parse(localStorage.getItem('maintenancetype'))

const initialState = {
    isLoading: false,
    maintenancetypes: maintenancetypeStore ? maintenancetypeStore : [],
    maintenancetype:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newMaintenancetype = [...aluu];
    newMaintenancetype.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newMaintenancetype;
}


export default function(state = initialState, action){
    switch (action.type) {
        case MAINTENANCETYPE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case MAINTENANCETYPE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case MAINTENANCETYPE_GET_MULTIPLE:
            localStorage.setItem('maintenancetype', JSON.stringify(action.payload));
            return {
                ...state,
                maintenancetypes : action.payload,
                msg:'DONE!!!'
            };
        case MAINTENANCETYPE_GET_ONE:
            let all = [...state.maintenancetypes];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                maintenancetype : ses,
                MSG:"DONE!!!"
            };
        case MAINTENANCETYPE_REGISTER_SUCCESS:
            localStorage.setItem('maintenancetype', JSON.stringify([...state.maintenancetypes, action.payload]));
            return {
                ...state,
                maintenancetypes: [...state.maintenancetypes, action.payload],
                msg:action.msg
            }; 
        case MAINTENANCETYPE_ACTIVATE_SUCCESS:
            let ac = changeState(state.maintenancetypes, action.payload);
            localStorage.setItem('maintenancetype', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                maintenancetypes: ac
            }
        case MAINTENANCETYPE_DELETE_SUCCESS:
            let rem = state.maintenancetypes.filter(cat => cat.id != action.payload);
            localStorage.setItem('maintenancetype', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                maintenancetypes: rem
            }
        case MAINTENANCETYPE_UPDATE_SUCCESS:
            const findInd = state.maintenancetypes.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.maintenancetypes];
            newState[findInd] = action.payload;
            localStorage.setItem('maintenancetype', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                maintenancetypes : newState,
                maintenancetype:action.payload
            }; 
        case MAINTENANCETYPE_LOADING_ERROR:
        case MAINTENANCETYPE_ACTIVATE_FAIL:
        case MAINTENANCETYPE_REGISTER_FAIL:
        case MAINTENANCETYPE_DELETE_FAIL:
        case MAINTENANCETYPE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
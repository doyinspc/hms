import {
    ROOMMAINTENANCE_GET_MULTIPLE,
    ROOMMAINTENANCE_GET_ONE,
    ROOMMAINTENANCE_REGISTER_SUCCESS,
    ROOMMAINTENANCE_REGISTER_FAIL,
    ROOMMAINTENANCE_LOADING,
    ROOMMAINTENANCE_LOADING_ERROR,
    ROOMMAINTENANCE_ACTIVATE_FAIL,
    ROOMMAINTENANCE_ACTIVATE_SUCCESS,
    ROOMMAINTENANCE_UPDATE_SUCCESS,
    ROOMMAINTENANCE_UPDATE_FAIL,
    ROOMMAINTENANCE_DELETE_SUCCESS,
    ROOMMAINTENANCE_DELETE_FAIL,
    ROOMMAINTENANCE_EDIT
} from "../types/roommaintenance";

let roommaintenanceStore = JSON.parse(localStorage.getItem('roommaintenance'))

const initialState = {
    isLoading: false,
    roommaintenances: roommaintenanceStore ? roommaintenanceStore : [],
    roommaintenance:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newRoommaintenance = [...aluu];
    newRoommaintenance.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newRoommaintenance;
}


export default function(state = initialState, action){
    switch (action.type) {
        case ROOMMAINTENANCE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case ROOMMAINTENANCE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case ROOMMAINTENANCE_GET_MULTIPLE:
            localStorage.setItem('roommaintenance', JSON.stringify(action.payload));
            return {
                ...state,
                roommaintenances : action.payload,
                msg:'DONE!!!'
            };
        case ROOMMAINTENANCE_GET_ONE:
            let all = [...state.roommaintenances];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                roommaintenance : ses,
                MSG:"DONE!!!"
            };
        case ROOMMAINTENANCE_REGISTER_SUCCESS:
            localStorage.setItem('roommaintenance', JSON.stringify([...state.roommaintenances, action.payload]));
            return {
                ...state,
                roommaintenances: [...state.roommaintenances, action.payload],
                msg:action.msg
            }; 
        case ROOMMAINTENANCE_ACTIVATE_SUCCESS:
            let ac = changeState(state.roommaintenances, action.payload);
            localStorage.setItem('roommaintenance', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                roommaintenances: ac
            }
        case ROOMMAINTENANCE_DELETE_SUCCESS:
            let rem = state.roommaintenances.filter(cat => cat.id != action.payload);
            localStorage.setItem('roommaintenance', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                roommaintenances: rem
            }
        case ROOMMAINTENANCE_UPDATE_SUCCESS:
            const findInd = state.roommaintenances.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.roommaintenances];
            newState[findInd] = action.payload;
            localStorage.setItem('roommaintenance', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                roommaintenances : newState,
                roommaintenance:action.payload
            }; 
        case ROOMMAINTENANCE_LOADING_ERROR:
        case ROOMMAINTENANCE_ACTIVATE_FAIL:
        case ROOMMAINTENANCE_REGISTER_FAIL:
        case ROOMMAINTENANCE_DELETE_FAIL:
        case ROOMMAINTENANCE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
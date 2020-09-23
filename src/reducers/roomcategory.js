import {
    ROOMCATEGORY_GET_MULTIPLE,
    ROOMCATEGORY_GET_ONE,
    ROOMCATEGORY_REGISTER_SUCCESS,
    ROOMCATEGORY_REGISTER_FAIL,
    ROOMCATEGORY_LOADING,
    ROOMCATEGORY_LOADING_ERROR,
    ROOMCATEGORY_ACTIVATE_FAIL,
    ROOMCATEGORY_ACTIVATE_SUCCESS,
    ROOMCATEGORY_UPDATE_SUCCESS,
    ROOMCATEGORY_UPDATE_FAIL,
    ROOMCATEGORY_DELETE_SUCCESS,
    ROOMCATEGORY_DELETE_FAIL,
    ROOMCATEGORY_EDIT
} from "../types/roomcategory";

let roomcategoryStore = JSON.parse(localStorage.getItem('roomcategory'))

const initialState = {
    isLoading: false,
    roomcategorys: roomcategoryStore ? roomcategoryStore : [],
    roomcategory:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newRoomcategory = [...aluu];
    newRoomcategory.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newRoomcategory;
}


export default function(state = initialState, action){
    switch (action.type) {
        case ROOMCATEGORY_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case ROOMCATEGORY_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case ROOMCATEGORY_GET_MULTIPLE:
            localStorage.setItem('roomcategory', JSON.stringify(action.payload));
            return {
                ...state,
                roomcategorys : action.payload,
                msg:'DONE!!!'
            };
        case ROOMCATEGORY_GET_ONE:
            let all = [...state.roomcategorys];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                roomcategory : ses,
                MSG:"DONE!!!"
            };
        case ROOMCATEGORY_REGISTER_SUCCESS:
            localStorage.setItem('roomcategory', JSON.stringify([...state.roomcategorys, action.payload]));
            return {
                ...state,
                roomcategorys: [...state.roomcategorys, action.payload],
                msg:action.msg
            }; 
        case ROOMCATEGORY_ACTIVATE_SUCCESS:
            let ac = changeState(state.roomcategorys, action.payload);
            localStorage.setItem('roomcategory', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                roomcategorys: ac
            }
        case ROOMCATEGORY_DELETE_SUCCESS:
            let rem = state.roomcategorys.filter(cat => cat.id != action.payload);
            localStorage.setItem('roomcategory', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                roomcategorys: rem
            }
        case ROOMCATEGORY_UPDATE_SUCCESS:
            const findInd = state.roomcategorys.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.roomcategorys];
            newState[findInd] = action.payload;
            localStorage.setItem('roomcategory', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                roomcategorys : newState,
                roomcategory:action.payload
            }; 
        case ROOMCATEGORY_LOADING_ERROR:
        case ROOMCATEGORY_ACTIVATE_FAIL:
        case ROOMCATEGORY_REGISTER_FAIL:
        case ROOMCATEGORY_DELETE_FAIL:
        case ROOMCATEGORY_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
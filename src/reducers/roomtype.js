import {
    ROOMTYPE_GET_MULTIPLE,
    ROOMTYPE_GET_MULTIPLE_DATA,
    ROOMTYPE_GET_MULTIPLE_ANALYSIS,
    ROOMTYPE_GET_ONE,
    ROOMTYPE_REGISTER_SUCCESS,
    ROOMTYPE_REGISTER_FAIL,
    ROOMTYPE_LOADING,
    ROOMTYPE_LOADING_ERROR,
    ROOMTYPE_ACTIVATE_FAIL,
    ROOMTYPE_ACTIVATE_SUCCESS,
    ROOMTYPE_UPDATE_SUCCESS,
    ROOMTYPE_UPDATE_FAIL,
    ROOMTYPE_DELETE_SUCCESS,
    ROOMTYPE_DELETE_FAIL,
    ROOMTYPE_EDIT
} from "../types/roomtype";

let roomtypeStore = JSON.parse(localStorage.getItem('roomtype'))
let roomdataStore = JSON.parse(localStorage.getItem('roomdata'))
let roomanalysisStore = JSON.parse(localStorage.getItem('roomanalysis'))

const initialState = {
    isLoading: false,
    roomtypes: roomtypeStore ? roomtypeStore : [],
    roomdata: roomdataStore ? roomdataStore : [],
    roomanalysis: roomanalysisStore ? roomanalysisStore : [],
    roomtype:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newRoomtype = [...aluu];
    newRoomtype.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newRoomtype;
}


export default function(state = initialState, action){
    switch (action.type) {
        case ROOMTYPE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case ROOMTYPE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case ROOMTYPE_GET_MULTIPLE:
            localStorage.setItem('roomtype', JSON.stringify(action.payload));
            return {
                ...state,
                roomtypes : action.payload,
                msg:'DONE!!!'
            };
        case ROOMTYPE_GET_MULTIPLE_DATA:
            localStorage.setItem('roomdata', JSON.stringify(action.payload));
            return {
                ...state,
                roomdata : action.payload
            };
        case ROOMTYPE_GET_MULTIPLE_ANALYSIS:
            localStorage.setItem('roomanalysis', JSON.stringify(action.payload));
            return {
                ...state,
                roomanalysis : action.payload
            };
        case ROOMTYPE_GET_ONE:
            let all = [...state.roomtypes];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                roomtype : ses,
                MSG:"DONE!!!"
            };
        case ROOMTYPE_REGISTER_SUCCESS:
            localStorage.setItem('roomtype', JSON.stringify([...state.roomtypes, action.payload]));
            return {
                ...state,
                roomtypes: [...state.roomtypes, action.payload],
                msg:action.msg
            }; 
        case ROOMTYPE_ACTIVATE_SUCCESS:
            let ac = changeState(state.roomtypes, action.payload);
            localStorage.setItem('roomtype', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                roomtypes: ac
            }
        case ROOMTYPE_DELETE_SUCCESS:
            let rem = state.roomtypes.filter(cat => cat.id != action.payload);
            localStorage.setItem('roomtype', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                roomtypes: rem
            }
        case ROOMTYPE_UPDATE_SUCCESS:
            const findInd = state.roomtypes.findIndex(cat => parseInt(cat.id) === parseInt(action.payload.id));
            let newState = [...state.roomtypes];
            newState[findInd] = action.payload;
            localStorage.setItem('roomtype', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                roomtypes : newState,
                roomtype:action.payload
            }; 
        case ROOMTYPE_LOADING_ERROR:
        case ROOMTYPE_ACTIVATE_FAIL:
        case ROOMTYPE_REGISTER_FAIL:
        case ROOMTYPE_DELETE_FAIL:
        case ROOMTYPE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
import {
    ROOM_GET_MULTIPLE,
    ROOM_GET_ONE,
    ROOM_REGISTER_SUCCESS,
    ROOM_REGISTER_FAIL,
    ROOM_LOADING,
    ROOM_LOADING_ERROR,
    ROOM_ACTIVATE_FAIL,
    ROOM_ACTIVATE_SUCCESS,
    ROOM_UPDATE_SUCCESS,
    ROOM_UPDATE_FAIL,
    ROOM_DELETE_SUCCESS,
    ROOM_DELETE_FAIL,
    ROOM_EDIT
} from "../types/room";

let roomStore = JSON.parse(localStorage.getItem('room'))

const initialState = {
    isLoading: false,
    rooms: roomStore ? roomStore : [],
    room:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newRoom = [...aluu];
    newRoom.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newRoom;
}


export default function(state = initialState, action){
    switch (action.type) {
        case ROOM_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case ROOM_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case ROOM_GET_MULTIPLE:
            localStorage.setItem('room', JSON.stringify(action.payload));
            return {
                ...state,
                rooms : action.payload,
                msg:'DONE!!!'
            };
        case ROOM_GET_ONE:
            let all = [...state.rooms];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                room : ses,
                MSG:"DONE!!!"
            };
        case ROOM_REGISTER_SUCCESS:
            localStorage.setItem('room', JSON.stringify([...state.rooms, action.payload]));
            return {
                ...state,
                rooms: [...state.rooms, action.payload],
                msg:action.msg
            }; 
        case ROOM_ACTIVATE_SUCCESS:
            let ac = changeState(state.rooms, action.payload);
            localStorage.setItem('room', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                rooms: ac
            }
        case ROOM_DELETE_SUCCESS:
            let rem = state.rooms.filter(cat => cat.id != action.payload);
            localStorage.setItem('room', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                rooms: rem
            }
        case ROOM_UPDATE_SUCCESS:
            const findInd = state.rooms.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.rooms];
            newState[findInd] = action.payload;
            localStorage.setItem('room', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                rooms : newState,
                room:action.payload
            }; 
        case ROOM_LOADING_ERROR:
        case ROOM_ACTIVATE_FAIL:
        case ROOM_REGISTER_FAIL:
        case ROOM_DELETE_FAIL:
        case ROOM_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
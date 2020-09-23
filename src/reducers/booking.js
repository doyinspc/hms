import {
    BOOKING_GET_MULTIPLE,
    BOOKING_GET_ONE,
    BOOKING_REGISTER_SUCCESS,
    BOOKING_REGISTER_FAIL,
    BOOKING_LOADING,
    BOOKING_LOADING_ERROR,
    BOOKING_ACTIVATE_FAIL,
    BOOKING_ACTIVATE_SUCCESS,
    BOOKING_UPDATE_SUCCESS,
    BOOKING_UPDATE_FAIL,
    BOOKING_DELETE_SUCCESS,
    BOOKING_DELETE_FAIL,
    BOOKING_EDIT
} from "../types/booking";

let bookingStore = JSON.parse(localStorage.getItem('booking'))

const initialState = {
    isLoading: false,
    bookings: bookingStore ? bookingStore : [],
    booking:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newBooking = [...aluu];
    newBooking.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newBooking;
}


export default function(state = initialState, action){
    switch (action.type) {
        case BOOKING_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case BOOKING_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case BOOKING_GET_MULTIPLE:
            localStorage.setItem('booking', JSON.stringify(action.payload));
            return {
                ...state,
                bookings : action.payload,
                msg:'DONE!!!'
            };
        case BOOKING_GET_ONE:
            let all = [...state.bookings];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                booking : ses,
                MSG:"DONE!!!"
            };
        case BOOKING_REGISTER_SUCCESS:
            localStorage.setItem('booking', JSON.stringify([...state.bookings, action.payload]));
            return {
                ...state,
                bookings: [...state.bookings, action.payload],
                msg:action.msg
            }; 
        case BOOKING_ACTIVATE_SUCCESS:
            let ac = changeState(state.bookings, action.payload);
            localStorage.setItem('booking', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                bookings: ac
            }
        case BOOKING_DELETE_SUCCESS:
            let rem = state.bookings.filter(cat => cat.id != action.payload);
            localStorage.setItem('booking', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                bookings: rem
            }
        case BOOKING_UPDATE_SUCCESS:
            const findInd = state.bookings.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.bookings];
            newState[findInd] = action.payload;
            localStorage.setItem('booking', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                bookings : newState,
                booking:action.payload
            }; 
        case BOOKING_LOADING_ERROR:
        case BOOKING_ACTIVATE_FAIL:
        case BOOKING_REGISTER_FAIL:
        case BOOKING_DELETE_FAIL:
        case BOOKING_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
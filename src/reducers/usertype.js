import {
    USERTYPE_GET_MULTIPLE,
    USERTYPE_GET_ONE,
    USERTYPE_REGISTER_SUCCESS,
    USERTYPE_REGISTER_FAIL,
    USERTYPE_LOADING,
    USERTYPE_LOADING_ERROR,
    USERTYPE_ACTIVATE_FAIL,
    USERTYPE_ACTIVATE_SUCCESS,
    USERTYPE_UPDATE_SUCCESS,
    USERTYPE_UPDATE_FAIL,
    USERTYPE_DELETE_SUCCESS,
    USERTYPE_DELETE_FAIL,
    USERTYPE_EDIT
} from "../types/usertype";

let usertypeStore = JSON.parse(localStorage.getItem('usertype'))

const initialState = {
    isLoading: false,
    usertypes: usertypeStore ? usertypeStore : [],
    usertype:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newUsertype = [...aluu];
    newUsertype.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newUsertype;
}


export default function(state = initialState, action){
    switch (action.type) {
        case USERTYPE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case USERTYPE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case USERTYPE_GET_MULTIPLE:
            localStorage.setItem('usertype', JSON.stringify(action.payload));
            return {
                ...state,
                usertypes : action.payload,
                msg:'DONE!!!'
            };
        case USERTYPE_GET_ONE:
            let all = [...state.usertypes];
            let ses = all.filter(row=>row.id == action.payload)[0];
            return {
                ...state,
                usertype : ses,
                MSG:"DONE!!!"
            };
        case USERTYPE_REGISTER_SUCCESS:
            localStorage.setItem('usertype', JSON.stringify([...state.usertypes, action.payload]));
            return {
                ...state,
                usertypes: [...state.usertypes, action.payload],
                msg:action.msg
            }; 
        case USERTYPE_ACTIVATE_SUCCESS:
            let ac = changeState(state.usertypes, action.payload);
            localStorage.setItem('usertype', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                usertypes: ac
            }
        case USERTYPE_DELETE_SUCCESS:
            let rem = state.usertypes.filter(cat => cat.id != action.payload);
            localStorage.setItem('usertype', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                usertypes: rem
            }
        case USERTYPE_UPDATE_SUCCESS:
            const findInd = state.usertypes.findIndex(cat => parseInt(cat.id) === parseInt(action.payload.id));
            let newState = [...state.usertypes];
            newState[findInd] = action.payload;
            localStorage.setItem('usertype', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                usertypes : newState,
                usertype:action.payload
            }; 
        case USERTYPE_LOADING_ERROR:
        case USERTYPE_ACTIVATE_FAIL:
        case USERTYPE_REGISTER_FAIL:
        case USERTYPE_DELETE_FAIL:
        case USERTYPE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
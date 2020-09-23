import {
    INVENTORYTYPE_GET_MULTIPLE,
    INVENTORYTYPE_GET_ONE,
    INVENTORYTYPE_REGISTER_SUCCESS,
    INVENTORYTYPE_REGISTER_FAIL,
    INVENTORYTYPE_LOADING,
    INVENTORYTYPE_LOADING_ERROR,
    INVENTORYTYPE_ACTIVATE_FAIL,
    INVENTORYTYPE_ACTIVATE_SUCCESS,
    INVENTORYTYPE_UPDATE_SUCCESS,
    INVENTORYTYPE_UPDATE_FAIL,
    INVENTORYTYPE_DELETE_SUCCESS,
    INVENTORYTYPE_DELETE_FAIL,
    INVENTORYTYPE_EDIT
} from "../types/inventorytype";

let inventorytypeStore = JSON.parse(localStorage.getItem('inventorytype'))

const initialState = {
    isLoading: false,
    inventorytypes: inventorytypeStore ? inventorytypeStore : [],
    inventorytype:{},
    msg: null,
    isEdit:-1,
    ref:null,
}

const changeState = (aluu, actid) =>
{
    let newInventorytype = [...aluu];
    newInventorytype.forEach(alu => {
        if(alu.id == actid.id){
            alu.is_active = actid.is_active
        }
    });
    return newInventorytype;
}


export default function(state = initialState, action){
    switch (action.type) {
        case INVENTORYTYPE_EDIT:
            return {
                ...state,
                isEdit : action.payload
        };
        case INVENTORYTYPE_LOADING:
            return {
                ...state,
                isLoading : true
            };
        case INVENTORYTYPE_GET_MULTIPLE:
            localStorage.setItem('inventorytype', JSON.stringify(action.payload));
            return {
                ...state,
                inventorytypes : action.payload,
                msg:'DONE!!!'
            };
        case INVENTORYTYPE_GET_ONE:
            let all = [...state.inventorytypes];
            let ses = all.filter(row=>row.cid == action.payload)[0];
            return {
                ...state,
                inventorytype : ses,
                MSG:"DONE!!!"
            };
        case INVENTORYTYPE_REGISTER_SUCCESS:
            localStorage.setItem('inventorytype', JSON.stringify([...state.inventorytypes, action.payload]));
            return {
                ...state,
                inventorytypes: [...state.inventorytypes, action.payload],
                msg:action.msg
            }; 
        case INVENTORYTYPE_ACTIVATE_SUCCESS:
            let ac = changeState(state.inventorytypes, action.payload);
            localStorage.setItem('inventorytype', JSON.stringify(ac));
            return{
                ...state,
                msg:'DONE!!!',
                inventorytypes: ac
            }
        case INVENTORYTYPE_DELETE_SUCCESS:
            let rem = state.inventorytypes.filter(cat => cat.id != action.payload);
            localStorage.setItem('inventorytype', JSON.stringify(rem));
            return{
                ...state,
                msg:'DONE!!!',
                inventorytypes: rem
            }
        case INVENTORYTYPE_UPDATE_SUCCESS:
            const findInd = state.inventorytypes.findIndex(cat => cat.id == action.payload.id);
            let newState = [...state.inventorytypes];
            newState[findInd] = action.payload;
            localStorage.setItem('inventorytype', JSON.stringify(newState));
            return {
                ...state,
                ...action.payload,
                inventorytypes : newState,
                inventorytype:action.payload
            }; 
        case INVENTORYTYPE_LOADING_ERROR:
        case INVENTORYTYPE_ACTIVATE_FAIL:
        case INVENTORYTYPE_REGISTER_FAIL:
        case INVENTORYTYPE_DELETE_FAIL:
        case INVENTORYTYPE_UPDATE_FAIL:

            return {
                ...state,
                isLoading: false,
                msg: action.msg
            };
        default:
            return state;
    }

}
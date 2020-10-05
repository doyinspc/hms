import axios from 'axios';
import {
    INVENTORYTRANSACTION_GET_ONE,
    INVENTORYTRANSACTION_GET_MULTIPLE,
    INVENTORYTRANSACTION_REGISTER_SUCCESS,
    INVENTORYTRANSACTION_REGISTER_FAIL,
    INVENTORYTRANSACTION_LOADING,
    INVENTORYTRANSACTION_LOADING_ERROR,
    INVENTORYTRANSACTION_UPDATE_SUCCESS,
    INVENTORYTRANSACTION_UPDATE_FAIL,
    INVENTORYTRANSACTION_DELETE_SUCCESS,
    INVENTORYTRANSACTION_DELETE_FAIL,
    INVENTORYTRANSACTION_EDIT,
} from "./../types/inventorytransaction";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'inventorytransactions';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL INVENTORYTRANSACTION 
export const getInventorytransactions = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    dispatch({type : INVENTORYTRANSACTION_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: INVENTORYTRANSACTION_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : INVENTORYTRANSACTION_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE INVENTORYTRANSACTION 
export const getInventorytransaction = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : INVENTORYTRANSACTION_GET_ONE,
        payload: id
    });  
};
//INVENTORYTRANSACTION DELETE
export const deleteInventorytransaction = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: INVENTORYTRANSACTION_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : INVENTORYTRANSACTION_DELETE_FAIL,
                payload : err
            })
        })
        
}
//INVENTORYTRANSACTION REGISTER
export const registerInventorytransaction = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: INVENTORYTRANSACTION_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : INVENTORYTRANSACTION_REGISTER_FAIL,
                payload: err
            })
        })
};
 //INVENTORYTRANSACTION UPDATE
export const updateInventorytransaction = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: INVENTORYTRANSACTION_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : INVENTORYTRANSACTION_UPDATE_FAIL,
                payload: err
            })
        })
};

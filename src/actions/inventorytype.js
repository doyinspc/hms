import axios from 'axios';
import {
    INVENTORYTYPE_GET_ONE,
    INVENTORYTYPE_GET_MULTIPLE,
    INVENTORYTYPE_REGISTER_SUCCESS,
    INVENTORYTYPE_REGISTER_FAIL,
    INVENTORYTYPE_LOADING,
    INVENTORYTYPE_LOADING_ERROR,
    INVENTORYTYPE_UPDATE_SUCCESS,
    INVENTORYTYPE_UPDATE_FAIL,
    INVENTORYTYPE_DELETE_SUCCESS,
    INVENTORYTYPE_DELETE_FAIL,
    INVENTORYTYPE_EDIT,
} from "./../types/inventorytype";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'inventorytypes';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL INVENTORYTYPE 
export const getInventorytypes = params=> (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    dispatch({type : INVENTORYTYPE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: INVENTORYTYPE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : INVENTORYTYPE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE INVENTORYTYPE 
export const getInventorytype = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : INVENTORYTYPE_GET_ONE,
        payload: id
    });  
};
//INVENTORYTYPE DELETE
export const deleteInventorytype = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: INVENTORYTYPE_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : INVENTORYTYPE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//INVENTORYTYPE REGISTER
export const registerInventorytype = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: INVENTORYTYPE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : INVENTORYTYPE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //INVENTORYTYPE UPDATE
export const updateInventorytype = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: INVENTORYTYPE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : INVENTORYTYPE_UPDATE_FAIL,
                payload: err
            })
        })
};

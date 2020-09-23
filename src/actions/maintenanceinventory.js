import axios from 'axios';
import {
    MAINTENANCEINVENTORY_GET_ONE,
    MAINTENANCEINVENTORY_GET_MULTIPLE,
    MAINTENANCEINVENTORY_REGISTER_SUCCESS,
    MAINTENANCEINVENTORY_REGISTER_FAIL,
    MAINTENANCEINVENTORY_LOADING,
    MAINTENANCEINVENTORY_LOADING_ERROR,
    MAINTENANCEINVENTORY_UPDATE_SUCCESS,
    MAINTENANCEINVENTORY_UPDATE_FAIL,
    MAINTENANCEINVENTORY_DELETE_SUCCESS,
    MAINTENANCEINVENTORY_DELETE_FAIL,
    MAINTENANCEINVENTORY_EDIT,
} from "./../types/maintenanceinventory";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'maintenanceinventorys';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL MAINTENANCEINVENTORY 
export const getMaintenanceinventorys = dat => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = dat;
    params.cat = 'select';
    dispatch({type : MAINTENANCEINVENTORY_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: MAINTENANCEINVENTORY_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : MAINTENANCEINVENTORY_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE MAINTENANCEINVENTORY 
export const getMaintenanceinventory = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : MAINTENANCEINVENTORY_GET_ONE,
        payload: id
    });  
};
//MAINTENANCEINVENTORY DELETE
export const deleteMaintenanceinventory = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: MAINTENANCEINVENTORY_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : MAINTENANCEINVENTORY_DELETE_FAIL,
                payload : err
            })
        })
        
}
//MAINTENANCEINVENTORY REGISTER
export const registerMaintenanceinventory = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: MAINTENANCEINVENTORY_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : MAINTENANCEINVENTORY_REGISTER_FAIL,
                payload: err
            })
        })
};
 //MAINTENANCEINVENTORY UPDATE
export const updateMaintenanceinventory = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: MAINTENANCEINVENTORY_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : MAINTENANCEINVENTORY_UPDATE_FAIL,
                payload: err
            })
        })
};

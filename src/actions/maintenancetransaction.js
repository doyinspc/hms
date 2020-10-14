import axios from 'axios';
import {
    MAINTENANCETRANSACTION_GET_ONE,
    MAINTENANCETRANSACTION_GET_MULTIPLE,
    MAINTENANCETRANSACTION_REGISTER_SUCCESS,
    MAINTENANCETRANSACTION_REGISTER_FAIL,
    MAINTENANCETRANSACTION_LOADING,
    MAINTENANCETRANSACTION_LOADING_ERROR,
    MAINTENANCETRANSACTION_UPDATE_SUCCESS,
    MAINTENANCETRANSACTION_UPDATE_FAIL,
    MAINTENANCETRANSACTION_DELETE_SUCCESS,
    MAINTENANCETRANSACTION_DELETE_FAIL,
    MAINTENANCETRANSACTION_EDIT,
} from "./../types/maintenancetransaction";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'maintenance_transactions';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL MAINTENANCETRANSACTION 
export const getMaintenancetransactions = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    dispatch({type : MAINTENANCETRANSACTION_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: MAINTENANCETRANSACTION_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : MAINTENANCETRANSACTION_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE MAINTENANCETRANSACTION 
export const getMaintenancetransaction = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : MAINTENANCETRANSACTION_GET_ONE,
        payload: id
    });  
};
//MAINTENANCETRANSACTION DELETE
export const deleteMaintenancetransaction = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: MAINTENANCETRANSACTION_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : MAINTENANCETRANSACTION_DELETE_FAIL,
                payload : err
            })
        })
        
}
//MAINTENANCETRANSACTION REGISTER
export const registerMaintenancetransaction = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: MAINTENANCETRANSACTION_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : MAINTENANCETRANSACTION_REGISTER_FAIL,
                payload: err
            })
        })
};
 //MAINTENANCETRANSACTION UPDATE
export const updateMaintenancetransaction = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: MAINTENANCETRANSACTION_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : MAINTENANCETRANSACTION_UPDATE_FAIL,
                payload: err
            })
        })
};

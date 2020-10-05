import axios from 'axios';
import {
    MAINTENANCETYPE_GET_ONE,
    MAINTENANCETYPE_GET_MULTIPLE,
    MAINTENANCETYPE_REGISTER_SUCCESS,
    MAINTENANCETYPE_REGISTER_FAIL,
    MAINTENANCETYPE_LOADING,
    MAINTENANCETYPE_LOADING_ERROR,
    MAINTENANCETYPE_UPDATE_SUCCESS,
    MAINTENANCETYPE_UPDATE_FAIL,
    MAINTENANCETYPE_DELETE_SUCCESS,
    MAINTENANCETYPE_DELETE_FAIL,
    MAINTENANCETYPE_EDIT,
} from "./../types/maintenancetype";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'maintenancetypes';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL MAINTENANCETYPE 
export const getMaintenancetypes = params=> (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    dispatch({type : MAINTENANCETYPE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: MAINTENANCETYPE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : MAINTENANCETYPE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE MAINTENANCETYPE 
export const getMaintenancetype = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : MAINTENANCETYPE_GET_ONE,
        payload: id
    });  
};
//MAINTENANCETYPE DELETE
export const deleteMaintenancetype = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: MAINTENANCETYPE_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : MAINTENANCETYPE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//MAINTENANCETYPE REGISTER
export const registerMaintenancetype = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: MAINTENANCETYPE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : MAINTENANCETYPE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //MAINTENANCETYPE UPDATE
export const updateMaintenancetype = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: MAINTENANCETYPE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : MAINTENANCETYPE_UPDATE_FAIL,
                payload: err
            })
        })
};

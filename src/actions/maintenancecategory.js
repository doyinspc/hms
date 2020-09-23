import axios from 'axios';
import {
    MAINTENANCECATEGORY_GET_ONE,
    MAINTENANCECATEGORY_GET_MULTIPLE,
    MAINTENANCECATEGORY_REGISTER_SUCCESS,
    MAINTENANCECATEGORY_REGISTER_FAIL,
    MAINTENANCECATEGORY_LOADING,
    MAINTENANCECATEGORY_LOADING_ERROR,
    MAINTENANCECATEGORY_UPDATE_SUCCESS,
    MAINTENANCECATEGORY_UPDATE_FAIL,
    MAINTENANCECATEGORY_DELETE_SUCCESS,
    MAINTENANCECATEGORY_DELETE_FAIL,
    MAINTENANCECATEGORY_EDIT,
} from "./../types/maintenancecategory";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'maintenancecategorys';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL MAINTENANCECATEGORY 
export const getMaintenancecategorys = dat => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = dat;
    params.cat = 'select';
    dispatch({type : MAINTENANCECATEGORY_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: MAINTENANCECATEGORY_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : MAINTENANCECATEGORY_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE MAINTENANCECATEGORY 
export const getMaintenancecategory = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : MAINTENANCECATEGORY_GET_ONE,
        payload: id
    });  
};
//MAINTENANCECATEGORY DELETE
export const deleteMaintenancecategory = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: MAINTENANCECATEGORY_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : MAINTENANCECATEGORY_DELETE_FAIL,
                payload : err
            })
        })
        
}
//MAINTENANCECATEGORY REGISTER
export const registerMaintenancecategory = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: MAINTENANCECATEGORY_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : MAINTENANCECATEGORY_REGISTER_FAIL,
                payload: err
            })
        })
};
 //MAINTENANCECATEGORY UPDATE
export const updateMaintenancecategory = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: MAINTENANCECATEGORY_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : MAINTENANCECATEGORY_UPDATE_FAIL,
                payload: err
            })
        })
};

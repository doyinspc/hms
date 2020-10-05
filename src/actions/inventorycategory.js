import axios from 'axios';
import {
    INVENTORYCATEGORY_GET_ONE,
    INVENTORYCATEGORY_GET_MULTIPLE,
    INVENTORYCATEGORY_REGISTER_SUCCESS,
    INVENTORYCATEGORY_REGISTER_FAIL,
    INVENTORYCATEGORY_LOADING,
    INVENTORYCATEGORY_LOADING_ERROR,
    INVENTORYCATEGORY_UPDATE_SUCCESS,
    INVENTORYCATEGORY_UPDATE_FAIL,
    INVENTORYCATEGORY_DELETE_SUCCESS,
    INVENTORYCATEGORY_DELETE_FAIL,
    INVENTORYCATEGORY_EDIT,
} from "./../types/inventorycategory";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'inventorycategorys';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL INVENTORYCATEGORY 
export const getInventorycategorys = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    dispatch({type : INVENTORYCATEGORY_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: INVENTORYCATEGORY_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : INVENTORYCATEGORY_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE INVENTORYCATEGORY 
export const getInventorycategory = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : INVENTORYCATEGORY_GET_ONE,
        payload: id
    });  
};
//INVENTORYCATEGORY DELETE
export const deleteInventorycategory = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: INVENTORYCATEGORY_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : INVENTORYCATEGORY_DELETE_FAIL,
                payload : err
            })
        })
        
}
//INVENTORYCATEGORY REGISTER
export const registerInventorycategory = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: INVENTORYCATEGORY_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : INVENTORYCATEGORY_REGISTER_FAIL,
                payload: err
            })
        })
};
 //INVENTORYCATEGORY UPDATE
export const updateInventorycategory = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: INVENTORYCATEGORY_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : INVENTORYCATEGORY_UPDATE_FAIL,
                payload: err
            })
        })
};

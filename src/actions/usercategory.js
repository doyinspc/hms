import axios from 'axios';
import {
    USERCATEGORY_GET_ONE,
    USERCATEGORY_GET_MULTIPLE,
    USERCATEGORY_REGISTER_SUCCESS,
    USERCATEGORY_REGISTER_FAIL,
    USERCATEGORY_LOADING,
    USERCATEGORY_LOADING_ERROR,
    USERCATEGORY_UPDATE_SUCCESS,
    USERCATEGORY_UPDATE_FAIL,
    USERCATEGORY_DELETE_SUCCESS,
    USERCATEGORY_DELETE_FAIL,
    USERCATEGORY_EDIT,
} from "./../types/usercategory";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'usercategorys';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL USERCATEGORY 
export const getUsercategorys = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    dispatch({type : USERCATEGORY_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: USERCATEGORY_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : USERCATEGORY_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE USERCATEGORY 
export const getUsercategory = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : USERCATEGORY_GET_ONE,
        payload: id
    });  
};
//USERCATEGORY DELETE
export const deleteUsercategory = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: USERCATEGORY_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : USERCATEGORY_DELETE_FAIL,
                payload : err
            })
        })
        
}
//USERCATEGORY REGISTER
export const registerUsercategory = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: USERCATEGORY_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : USERCATEGORY_REGISTER_FAIL,
                payload: err
            })
        })
};
 //USERCATEGORY UPDATE
export const updateUsercategory = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: USERCATEGORY_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : USERCATEGORY_UPDATE_FAIL,
                payload: err
            })
        })
};

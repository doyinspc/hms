import axios from 'axios';
import {
    USERTYPE_GET_ONE,
    USERTYPE_GET_MULTIPLE,
    USERTYPE_REGISTER_SUCCESS,
    USERTYPE_REGISTER_FAIL,
    USERTYPE_LOADING,
    USERTYPE_LOADING_ERROR,
    USERTYPE_UPDATE_SUCCESS,
    USERTYPE_UPDATE_FAIL,
    USERTYPE_DELETE_SUCCESS,
    USERTYPE_DELETE_FAIL,
    USERTYPE_EDIT,
} from "./../types/usertype";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'usertypes';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL USERTYPE 
export const getUsertypes = params=> (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    dispatch({type : USERTYPE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: USERTYPE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : USERTYPE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE USERTYPE 
export const getUsertype = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : USERTYPE_GET_ONE,
        payload: id
    });  
};
//USERTYPE DELETE
export const deleteUsertype = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: USERTYPE_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : USERTYPE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//USERTYPE REGISTER
export const registerUsertype = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: USERTYPE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : USERTYPE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //USERTYPE UPDATE
export const updateUsertype = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: USERTYPE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : USERTYPE_UPDATE_FAIL,
                payload: err
            })
        })
};
